import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	event.locals.session = await event.locals.auth.validate();

	return resolve(event);
};
