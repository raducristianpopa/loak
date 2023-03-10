import type { Context } from "@/graphql/builder";
import { schema } from "@/graphql/schema";
import { getUser, type ClerkUserWithPrivateMetadata } from "@/utils/helpers";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { createYoga } from "graphql-yoga";

export default createYoga<{
    req: NextApiRequest;
    res: NextApiResponse;
}>({
    graphiql: {
        additionalHeaders: {
            "X-CSRF-Trick": "LOAK",
        },
    },
    schema,
    context: async ({ req, res }): Promise<Context> => {
        if (req.method === "POST" && req.headers["x-csrf-trick"] !== "LOAK") {
            res.status(400).end("Missing CSRF verification.");
        }

        const { userId } = getAuth(req);
        const clerkUser = userId
            ? ((await clerkClient.users.getUser(
                  userId,
              )) as ClerkUserWithPrivateMetadata)
            : null;

        const user = await getUser(clerkUser);

        return {
            req,
            res,
            user,
        };
    },
    graphqlEndpoint: "/api/graphql",
});
