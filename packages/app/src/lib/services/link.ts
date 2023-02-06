import { keyExists } from "@/utils/helpers";
import type { Link } from "@prisma/client";
import { prisma } from "../prisma";
import { redis } from "../redis";

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

    // Save link in database
    const link = await prisma.link.create({
        data: {
            domain,
            key,
            targetUrl,
            userId,
        },
    });

    // Store the short link in redis
    await redis.set(
        `${domain}:${key}`,
        {
            url: targetUrl,
        },
        {
            nx: true,
        },
    );

    return link;
};
