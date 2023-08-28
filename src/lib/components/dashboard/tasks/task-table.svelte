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
	import { TaskDropdown } from "$lib/components/dashboard";
	import { Reload } from "radix-icons-svelte";
	import * as Alert from "$lib/components/ui/alert";

	export let tasks: Task[] = [];
	export let data: SuperValidated<DeleteTaskSchema>;
	let loadingId = "";
	const { enhance, message } = superForm(data, {
		taintedMessage: null,
		multipleSubmits: "allow",
		delayMs: 700,
		onSubmit: ({ action }) => {
			const id = action.searchParams.get("id");
			if (id) {
				loadingId = id;
			}
		},
		onResult: () => {
			loadingId = "";
		}
	});
</script>

{#if $message}
	<Alert.Root variant="destructive">
		<Alert.Title>Error!</Alert.Title>
		<Alert.Description>
			{$message}
		</Alert.Description>
	</Alert.Root>
{/if}
<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Category</Table.Head>
			<Table.Head />
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each tasks as task}
			<Table.Row>
				<Table.Cell class="py-4">{task.name}</Table.Cell>
				<Table.Cell>
					<Badge variant="outline">work</Badge>
				</Table.Cell>
				<Table.Cell class="text-right">
					<form method="POST" use:enhance class="w-full flex items-center justify-end">
						{#if loadingId === task.id}
							<div class="h-9 w-9 inline-flex items-center justify-center">
								<Reload class="h-4 w-4 animate-spin" />
							</div>
						{:else}
							<TaskDropdown id={task.id} />
						{/if}
					</form>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
