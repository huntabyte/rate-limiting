import { message, superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";
import { createTaskSchema } from "$lib/components/dashboard/tasks/add-task-form.svelte";
import { error, type Actions, fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { deleteTaskSchema } from "$lib/components/dashboard/tasks/task-table.svelte";
import { auth } from "$lib/server/lucia";
import { ratelimit } from "$lib/server/redis";

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

		const { success, reset, remaining, limit } = await ratelimit.create.limit(
			event.locals.session.user.userId
		);
		console.log("remaining:", remaining);
		console.log("limit:", limit);
		console.log("reset:", reset);

		if (!success) {
			console.log("failed!");
			const timeRemaining = Math.floor((reset - Date.now()) / 1000);
			return message(form, `You are doing that too much, wait ${timeRemaining}s and try again.`, {
				status: 429
			});
		}

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

		const { success, reset, remaining, limit } = await ratelimit.delete.limit(
			event.locals.session.user.userId
		);
		console.log("remaining:", remaining);
		console.log("limit:", limit);
		console.log("reset:", reset);

		if (!success) {
			console.log("failed!");
			const timeRemaining = Math.floor((reset - Date.now()) / 1000);
			return message(form, `You are doing that too much, wait ${timeRemaining}s and try again.`, {
				status: 429
			});
		}

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
	},
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, "/login");
	}
};
