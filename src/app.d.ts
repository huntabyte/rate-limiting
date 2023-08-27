// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />

type UserAttributes = {
	username: string;
	full_name: string;
};
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import("lucia").AuthRequest;
			session: import("lucia").Session | null;
		}
		interface PageData {
			session: import("lucia").Session | null;
		}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	var __prisma: import("@prisma/client").PrismaClient;
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = UserAttributes;
		type DatabaseUser = import("@prisma/client").User;
	}
}

export {};
