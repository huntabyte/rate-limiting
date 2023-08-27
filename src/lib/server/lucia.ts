import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import { github } from "@lucia-auth/oauth/providers";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

export const auth = lucia({
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
	adapter: prismaAdapter(prisma, {
		user: "user",
		key: "key",
		session: "session"
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			full_name: data.full_name ?? ""
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
