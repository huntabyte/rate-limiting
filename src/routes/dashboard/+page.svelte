<script lang="ts">
	import { PageHeader } from "$lib/components/dashboard";
	import type { PageData } from "./$types";
	import AddTaskForm from "./add-task-form.svelte";
	import TaskTable from "./task-table.svelte";

	export let data: PageData;
</script>

<PageHeader>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight">My Tasks</h1>
		<AddTaskForm data={data.createTaskForm} />
	</div>
</PageHeader>
<div class="container lg:px-20">
	<TaskTable tasks={data.tasks} data={data.deleteTaskForm} />
</div>
