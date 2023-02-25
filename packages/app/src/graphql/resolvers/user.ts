import { prisma } from "@/lib/prisma";
import { builder } from "../builder";

builder.prismaNode("User", {
    id: { field: "id" },
    fields: (t) => ({
        email: t.exposeString("email"),
        links: t.relatedConnection("links", { cursor: "id" }),
    }),
});

builder.queryField("viewer", (t) =>
    t.prismaField({
        type: "User",
        nullable: true,
        skipTypeScopes: true,
        resolve: (query, _root, _args, { user }) => {
            if (!user?.id) {
                return null;
            }
            return prisma.user.findUniqueOrThrow({
                ...query,
                where: { id: user.id },
            });
        },
    }),
);
