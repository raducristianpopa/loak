import { clerkClient } from "@clerk/nextjs/app-beta/index";
import { prisma } from "./prisma";

// Only listening to the 'user.created' event at the moment. This object can be
// filled with different event types that are defined in Clerk's dashboard.
export enum WebhookEventType {
    UserCreated = "user.created",
}

// Type for the received event
export type Event = {
    data: ReceivedData;
    object: "event";
    type: WebhookEventType;
};

interface ReceivedData {
    email_addresses: {
        email_address: string;
        id: string;
    }[];
    private_metadata: {
        userId: string;
    };
    primary_email_address_id: string;
    username: string;
    id: string;
}

export const createUser = async (event: Event): Promise<void> => {
    const { data } = event;

    const emailObject = data.email_addresses?.find(
        (email) => email.id === data.primary_email_address_id,
    );

    if (!emailObject) {
        throw new Error(`Primary email address not found:`);
    }

    const user = await prisma.user.create({
        data: {
            clerkId: data.id,
            email: emailObject.email_address,
            username: data.username,
        },
    });

    // Set user private metadata
    await clerkClient.users.updateUser(data.id, {
        privateMetadata: { userId: user.id },
    });
};
