import { prisma } from "../prisma";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { User as ClerkUser } from "@clerk/nextjs/api";

type ClerkUserWithPrivateMetadata = ClerkUser & {
    privateMetadata: {
        userId?: string;
    };
};

type CreateInnerContextOptions = {
    user: ClerkUserWithPrivateMetadata | null;
};

type UserContextData = {
    id: string;
    clerkId: string;
};

async function getUser(
    receivedUser: ClerkUserWithPrivateMetadata | null,
): Promise<UserContextData | null> {
    if (!receivedUser) return null;

    // If the user does not have 'privateMetadata' set, this means that
    // an error occured when we received the webhook from Clerk and there
    // is a chance that the user was not created on our side or the 'privateMetadata'
    // was not set correctly.
    if (!receivedUser.privateMetadata.userId) {
        // First we check if the user exists on our side.
        let user = await prisma.user.findUnique({
            where: {
                clerkId: receivedUser.id,
            },
        });

        if (user) {
            // If the user exists, we set 'privateMetadata'.
            await clerkClient.users.updateUser(receivedUser.id, {
                privateMetadata: {
                    userId: user.id,
                },
            });

            return {
                id: user.id,
                clerkId: receivedUser.id,
            };
        }

        // If the user does not exist on our side, we create it.
        const emailObject = receivedUser.emailAddresses?.find(
            (email) => email.id === receivedUser.primaryEmailAddressId,
        );

        if (!emailObject) {
            await clerkClient.users.deleteUser(receivedUser.id);
            return null;
        }

        user = await prisma.user.create({
            data: {
                clerkId: receivedUser.id,
                email: emailObject.emailAddress,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                username: receivedUser.username!,
            },
        });

        return {
            id: user.id,
            clerkId: user.clerkId,
        };
    }

    return {
        id: receivedUser.privateMetadata.userId,
        clerkId: receivedUser.id,
    };
}

export const createInnerContext = async ({
    user,
}: CreateInnerContextOptions) => {
    const userContext = await getUser(user);

    return {
        user: userContext,
        prisma,
    };
};

export const createContext = async (opts: CreateNextContextOptions) => {
    const { userId } = getAuth(opts.req);
    const user = userId
        ? ((await clerkClient.users.getUser(
              userId,
          )) as ClerkUserWithPrivateMetadata)
        : null;

    return await createInnerContext({ user });
};

export type Context = inferAsyncReturnType<typeof createContext>;
