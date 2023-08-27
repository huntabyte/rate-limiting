import { message, superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { createTaskSchema } from "./add-task-form.svelte";
import { error, type Actions, fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { deleteTaskSchema } from "./task-table.svelte";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) throw redirect(302, "/login");

	const getTasks = async (user_id: string) => {
		const tasks = await prisma.task.findMany({
			where: {
				user_id
			}
		});

		return tasks;
	};

	return {
		createTaskForm: superValidate(createTaskSchema),
		deleteTaskForm: superValidate(deleteTaskSchema),
		tasks: getTasks(event.locals.session.user.userId)
	};
};

export const actions: Actions = {
	createTask: async (event) => {
		if (!event.locals.session) throw error(401, "Unauthorized");
		const form = await superValidate(event.request, createTaskSchema);

		if (!form.valid) return fail(400, { form });

		try {
			await prisma.task.create({
				data: {
					name: form.data.name,
					user_id: event.locals.session.user.userId
				}
			});
		} catch (e) {
			console.error(e);
			return message(form, "Something went wrong");
		}

		return {
			form
		};
	},
	deleteTask: async (event) => {
		if (!event.locals.session) throw error(401, "Unauthorized");
		const form = await superValidate(event.url, deleteTaskSchema);

		if (!form.valid) return fail(400, { form });

		try {
			await prisma.task.delete({
				where: {
					id: form.data.id
				}
			});
		} catch (e) {
			console.error(e);
			return message(form, "Something went wrong");
		}

		return {
			form
		};
	}
};
