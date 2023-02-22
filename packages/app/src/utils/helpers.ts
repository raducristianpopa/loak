import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { RESERVED_KEYS } from "./constants";
import { User as ClerkUser } from "@clerk/nextjs/api";

export const keyExists = async (
    domain: string,
    key: string,
): Promise<boolean> => {
    if (RESERVED_KEYS.has(key)) {
        return true;
    }

    const link = await prisma.link.findUnique({
        where: {
            domain_key: {
                domain,
                key,
            },
        },
    });

    return !!link;
};

export type ClerkUserWithPrivateMetadata = ClerkUser & {
    privateMetadata: {
        userId?: string;
    };
};

export type CreateInnerContextOptions = {
    user: ClerkUserWithPrivateMetadata | null;
};

export type UserContextData = {
    id: string;
    clerkId: string;
};

export const getUser = async (
    receivedUser: ClerkUserWithPrivateMetadata | null,
): Promise<UserContextData | null> => {
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
};
