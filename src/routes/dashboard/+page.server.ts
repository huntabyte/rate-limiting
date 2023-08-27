import { superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { createTaskSchema } from "./add-task-form.svelte";

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(createTaskSchema)
	};
};
