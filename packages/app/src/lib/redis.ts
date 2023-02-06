import { Redis } from "@upstash/redis";

export const redis = new Redis({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.UPSTASH_REDIS_REST_URL!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
