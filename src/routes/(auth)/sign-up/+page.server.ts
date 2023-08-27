import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { signUpSchema } from "./schema";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(signUpSchema)
	};
};
