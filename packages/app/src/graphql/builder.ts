import SchemaBuilder from "@pothos/core";
import type { UserContextData } from "@/utils/helpers";
import ErrorsPlugin from "@pothos/plugin-errors";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import ValidationPlugin from "@pothos/plugin-validation";
import type { IncomingMessage, OutgoingMessage } from "http";
import { prisma } from "@/lib/prisma";

export interface Context {
    req: IncomingMessage;
    res: OutgoingMessage;
    user?: UserContextData | null;
}

export const builder = new SchemaBuilder<{
    DefaultInputFieldRequiredness: true;

    PrismaTypes: PrismaTypes;
    Context: Context;
    Scalars: {
        ID: { Input: string; Output: string };
        DateTime: { Input: Date; Output: Date };
    };
    AuthScopes: {
        user: boolean;
        unauthenticated: boolean;
    };
}>({
    defaultInputFieldRequiredness: true,
    plugins: [
        ScopeAuthPlugin,
        RelayPlugin,
        PrismaPlugin,
        SimpleObjectsPlugin,
        ErrorsPlugin,
        ValidationPlugin,
    ],
    authScopes: async ({ user }) => ({
        user: !!user,
        unauthenticated: !user,
    }),
    prisma: { client: prisma },
    relayOptions: {
        // These will become the defaults in the next major version
        clientMutationId: "omit",
        cursorType: "String",
    },
});

builder.scalarType("DateTime", {
    serialize: (date) => date.toISOString(),
    parseValue: (date) => {
        if (typeof date !== "string") {
            throw new Error("Unknown date value.");
        }

        return new Date(date);
    },
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({
    // Set the default auth scope to be authenticated users:
    authScopes: {
        user: true,
    },
});

builder.mutationType({
    // Set the default auth scope to be authenticated users:
    authScopes: {
        user: true,
    },
});
