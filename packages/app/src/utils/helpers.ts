import { prisma } from "@/lib/prisma";
import { RESERVED_KEYS } from "./constants";

export const keyExists = async (
    domain: string,
    key: string,
): Promise<boolean> => {
    if (RESERVED_KEYS.has(key)) {
        return true;
    }

    const link = await prisma.link.findUnique({
        where: {
            domain_key: {
                domain,
                key,
            },
        },
    });

    return !!link;
};
