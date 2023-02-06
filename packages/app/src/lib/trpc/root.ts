import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import superjson from "superjson";

const trpc = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

const isAuth = trpc.middleware(({ next, ctx }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Not authenticated",
        });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const router = trpc.router;
export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(isAuth);
