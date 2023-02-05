import { keyExists } from "@/utils/helpers";
import type { Link } from "@prisma/client";
import { prisma } from "../prisma";

type CreateLinkProps = {
    domain: string;
    key: string;
    targetUrl: string;
    userId: string;
};

export const createLink = async (props: CreateLinkProps): Promise<Link> => {
    const { domain, key, userId, targetUrl } = props;

    if (await keyExists(domain, key)) {
        throw new Error("Key already exists.");
    }

    return prisma.link.create({
        data: {
            domain,
            key,
            targetUrl,
            userId,
        },
    });
};
