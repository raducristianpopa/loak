import { useMemo } from "react";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import {
    ApolloClient,
    ApolloError,
    HttpLink,
    InMemoryCache,
    type QueryOptions,
} from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let apolloClient: ApolloClient<any>;

interface ClientOptions {
    headers?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState?: Record<string, any>;
}

export function createApolloClient({ initialState, headers }: ClientOptions) {
    let nextClient = apolloClient;

    if (!nextClient) {
        nextClient = new ApolloClient({
            ssrMode: typeof window === "undefined",
            credentials: "include",
            link: new HttpLink({
                uri:
                    typeof window === "undefined"
                        ? "http://localhost:3000/api/graphql"
                        : "/api/graphql",
                headers: {
                    ...headers,
                    "X-CSRF-Trick": "LOAK",
                },
            }),
            cache: new InMemoryCache({}),
            connectToDevTools: true,
        });
    }

    if (initialState) {
        const existingCache = nextClient.extract();

        nextClient.cache.restore({ ...existingCache, ...initialState });
    }

    if (typeof window === "undefined") return nextClient;

    if (!apolloClient) apolloClient = nextClient;

    return nextClient;
}

export async function preloadQuery(
    context: GetServerSidePropsContext,
    ...queries: QueryOptions[]
): Promise<GetServerSidePropsResult<unknown>> {
    const client = createApolloClient({
        headers: context.req.headers as Record<string, string>,
    });

    try {
        await Promise.all(
            queries.map((queryOptions) => {
                client.query(queryOptions);
            }),
        );
        return {
            props: {
                initialClientState: client.cache.extract(),
            },
        };
    } catch (e) {
        if (e instanceof ApolloError) {
            const notFoundError = e.graphQLErrors.find((error: Error) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return (error as any)?.extensions.code === 404;
            });

            if (notFoundError) {
                return {
                    notFound: true,
                };
            }
        }

        // NOTE: By default, we treat errors to preloading as if we didn't attempt to
        // preload the request at all. This allows the client to react to this, re-attempt
        // the request, and react accordingly. If you'd rather the error trigger a failure
        // in the server-side rendering itself, replace the return with the following line:
        // throw e;
        return { props: {} };
    }
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient({});
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApollo(initialState?: Record<string, any>) {
    const client = useMemo(
        () => createApolloClient({ initialState }),
        [initialState],
    );

    return client;
}
