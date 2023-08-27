<script lang="ts">
	import { PageHeader } from "$lib/components/dashboard";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import type { PageData } from "./$types";
	import AddTaskForm from "./add-task-form.svelte";

	export let data: PageData;
</script>

<PageHeader>
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-semibold tracking-tight">My Tasks</h1>
		<AddTaskForm data={data.form} />
	</div>
</PageHeader>
