import { handleGithubAuth } from "$lib/server/auth-helpers";
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (event) => {
	const provider = event.params.provider;
	if (provider === "github") {
		await handleGithubAuth(event);
	}

	throw error(400, "Bad request");
};
