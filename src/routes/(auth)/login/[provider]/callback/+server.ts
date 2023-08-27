import { handleGitHubCallback } from "$lib/server/auth-helpers";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
	const provider = event.params.provider;
	if (provider === "github") {
		await handleGitHubCallback(event);
	}
	throw error(400, "Bad request");
};
