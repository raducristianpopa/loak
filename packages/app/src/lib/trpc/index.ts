import {
    httpBatchLink,
    loggerLink,
    type TRPCClientErrorLike,
} from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import {
    type Maybe,
    type inferRouterInputs,
    type inferRouterOutputs,
} from "@trpc/server";
import superjson from "superjson";
import { type AppRouter } from "./router/_app";

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        staleTime: 1000,
                        retry(failureCount, _err) {
                            const err = _err as never as Maybe<
                                TRPCClientErrorLike<AppRouter>
                            >;
                            const code = err?.data?.code;
                            if (
                                code === "BAD_REQUEST" ||
                                code === "FORBIDDEN" ||
                                code === "UNAUTHORIZED"
                            ) {
                                return false;
                            }
                            const MAX_QUERY_RETRIES = 3;
                            return failureCount < MAX_QUERY_RETRIES;
                        },
                    },
                },
            },
        };
    },
    ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
