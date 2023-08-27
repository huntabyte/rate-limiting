<script lang="ts">
	import { PageHeader } from "$lib/components/dashboard";
	import type { Task } from "@prisma/client";
	import type { PageData } from "./$types";
	import { AddTaskForm, TaskTable, TaskDropdown } from "$lib/components/dashboard";

	export let data: PageData;

	let tasks: Task[] = data.tasks;
	$: ({ tasks } = data);

	function addTask(task: Task) {
		tasks.push(task);
		tasks = tasks;
	}
</script>

<PageHeader>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight">My Tasks</h1>
		<div class="flex items-center gap-3">
			<TaskDropdown />
			<AddTaskForm data={data.createTaskForm} {addTask} />
		</div>
	</div>
</PageHeader>
<div class="container lg:px-20">
	<TaskTable {tasks} data={data.deleteTaskForm} />
</div>
