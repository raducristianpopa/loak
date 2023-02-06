import { createLink } from "@/lib/services/link";
import { z } from "zod";
import { router, protectedProcedure } from "../root";

export const linkRouter = router({
    create: protectedProcedure
        .input(
            z.object({
                target: z.string().url({ message: "Invalid URL." }),
                key: z.string().min(4, {
                    message: "Key must be at least 3 characters long.",
                }),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { user } = ctx;
            const { key, target } = input;

            const { hostname } = new URL(target);

            if (hostname === "loak.top") {
                throw new Error("Invalid URL.");
            }

            const link = await createLink({
                domain: "loak.top",
                key,
                userId: user.id,
                targetUrl: target,
            });

            return link;
        }),
});