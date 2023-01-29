import { type NextApiRequest, type NextApiResponse } from "next";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { IncomingHttpHeaders } from "http";
import { type Event, WebhookEventType, createUser } from "@/lib/webhooks";

// Add Svix headers to the request
type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const webhookSecret = process.env.WEBHOOK_SECRET || "";

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse,
) {
    const payload = (await buffer(req)).toString();
    const headers = req.headers;
    const webhook = new Webhook(webhookSecret);
    let event: Event | null = null;

    // Verify Svix headers
    try {
        event = webhook.verify(payload, headers) as Event;
    } catch (_) {
        return res.status(400).json({});
    }

    const eventType: WebhookEventType = event.type;

    try {
        switch (eventType) {
            case WebhookEventType.UserCreated:
                await createUser(event);
                break;
            default:
                console.log(`Received unknown event type: ${eventType}`);
                return res.status(400).json({});
        }
    } catch (e) {
        const errorInfo = e instanceof Error && e.stack ? e.stack : String(e);
        console.log(errorInfo);

        res.status(400).json({});
    }

    res.status(201).json({});
}

// Disable the bodyParser so Svix access the raw request body for verification.
export const config = {
    api: {
        bodyParser: false,
    },
};
