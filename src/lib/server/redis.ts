import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { REDIS_TOKEN, REDIS_URL } from "$env/static/private";

export const redis = new Redis({
	url: REDIS_URL,
	token: REDIS_TOKEN
});

export const rateLimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(10, "10 s"),
	analytics: true,
	prefix: "ratelimit"
});
