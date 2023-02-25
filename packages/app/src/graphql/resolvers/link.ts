import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { z } from "zod";
import { builder } from "../builder";

builder.prismaNode("Link", {
    id: { field: "id" },
    fields: (t) => ({
        domain: t.exposeString("domain"),
        key: t.exposeString("key"),
        targetUrl: t.exposeString("targetUrl"),
        archived: t.exposeBoolean("archived"),
        createdAt: t.field({
            type: "DateTime",
            resolve: (link) => link.createdAt,
        }),
    }),
});

builder.queryField("links", (t) =>
    t.prismaConnection({
        type: "Link",
        cursor: "id",
        edgesNullable: false,
        resolve: async (query, _root, _args, { user }) => {
            return prisma.link.findMany({
                ...query,
                where: {
                    userId: user?.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        },
    }),
);

const CreateLinkInput = builder.inputType("CreateLinkInput", {
    fields: (t) => ({
        target: t.string({
            validate: {
                schema: z.string().url({ message: "Invalid URL." }),
            },
        }),
        key: t.string({
            validate: {
                schema: z.string().min(4, {
                    message: "Key must be at least 3 characters long.",
                }),
            },
        }),
    }),
});

builder.mutationField("createLink", (t) =>
    t.prismaField({
        type: "Link",
        args: {
            input: t.arg({
                type: CreateLinkInput,
            }),
        },
        resolve: async (_query, _root, { input }, { user }) => {
            const link = await prisma.link.create({
                data: {
                    targetUrl: input.target,
                    key: input.key,
                    domain: "loak.top",
                    userId: user?.id,
                },
            });

            await redis.set(
                `${link.domain}:${link.key}`,
                { url: link.targetUrl },
                { nx: true },
            );

            return link;
        },
    }),
);

builder.mutationField("archiveLink", (t) =>
    t.prismaField({
        type: "Link",
        args: {
            id: t.arg.id({ required: true }),
        },
        nullable: true,
        resolve: async (_query, _root, { id }, { user }) => {
            const { id: linkId } = decodeGlobalID(id);

            const link = await prisma.link.findFirstOrThrow({
                where: {
                    id: linkId,
                    userId: user?.id,
                },
            });

            return prisma.link.update({
                where: {
                    id: link.id,
                },
                data: {
                    archived: !link.archived,
                },
            });
        },
    }),
);
