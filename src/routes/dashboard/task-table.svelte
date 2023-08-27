<script lang="ts" context="module">
	import { z } from "zod";

	export const deleteTaskSchema = z.object({
		id: z.string()
	});

	export type DeleteTaskSchema = typeof deleteTaskSchema;
</script>

<script lang="ts">
	import type { Task } from "@prisma/client";
	import * as Table from "$lib/components/ui/table";
	import { Badge } from "$lib/components/ui/badge";
	import type { SuperValidated } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$lib/components/ui/button";
	import { Reload, Trash } from "radix-icons-svelte";

	export let tasks: Task[] = [];
	export let data: SuperValidated<DeleteTaskSchema>;
	let deletingId: string | null = null;
	const { delayed, enhance } = superForm(data, {
		taintedMessage: null,
		onResult: () => {
			deletingId = null;
		}
	});
</script>

<form method="POST" class="w-full" use:enhance>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Category</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each tasks as task}
				<Table.Row>
					<Table.Cell class="py-4">{task.name}</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">work</Badge>
					</Table.Cell>
					<Table.Cell>
						<Button
							formaction="?/deleteTask&id={task.id}"
							variant="destructive"
							size="icon"
							class="px-0 py-0 p-0 w-8 h-8"
							on:click={() => {
								deletingId = task.id;
							}}
						>
							{#if $delayed && deletingId === task.id}
								<Reload class="h-4 w-4 animate-spin" />
							{:else}
								<Trash class="h-4 w-4" />
							{/if}
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</form>
