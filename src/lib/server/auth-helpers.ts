import { dev } from "$app/environment";
import { auth, githubAuth } from "$lib/server/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { json, redirect, type RequestEvent } from "@sveltejs/kit";

export async function handleGithubAuth(event: RequestEvent) {
	const [url, state] = await githubAuth.getAuthorizationUrl();
	event.cookies.set("github_oauth_state", state, {
		httpOnly: true,
		secure: dev ? false : true,
		path: "/",
		maxAge: 60 * 60
	});
	throw redirect(302, url.toString());
}

export async function handleGitHubCallback(event: RequestEvent) {
	const storedState = event.cookies.get("github_oauth_state");
	const state = event.url.searchParams.get("state");
	const code = event.url.searchParams.get("code");

	if (!storedState || !state || storedState !== state || !code) {
		return json(null, { status: 400 });
	}

	try {
		const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					username: githubUser.login,
					full_name: githubUser.name ?? ""
				}
			});
			return user;
		};

		const user = await getUser();

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		event.locals.auth.setSession(session);
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			return json({ message: "Bad Request" }, { status: 400 });
		}
		return json({ message: "An unexpected error occurred" }, { status: 500 });
	}
	throw redirect(302, "/");
}
