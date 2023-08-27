<script lang="ts" context="module">
	import { z } from "zod";

	export const createTaskSchema = z.object({
		name: z.string().min(1, "Name is required").max(100, "Task name is too long")
	});

	export type CreateTaskSchema = typeof createTaskSchema;
</script>

<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import type { SuperValidated } from "sveltekit-superforms";
	import { superForm } from "sveltekit-superforms/client";
	import { Input } from "$lib/components/ui/input";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";

	export let data: SuperValidated<CreateTaskSchema>;

	const { form, errors, enhance } = superForm(data, {
		taintedMessage: null,
		validators: createTaskSchema
	});
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]}>Create task</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Add task</Dialog.Title>
			<Dialog.Description
				>A more descriptive names increases its chance of completion!</Dialog.Description
			>
		</Dialog.Header>
		<form action="?/createTask" method="POST" use:enhance class="flex flex-col space-y-6">
			<div class="grid gap-2">
				<Label for="name">Name</Label>
				<Input id="name" name="name" bind:value={$form.name} />
				{#if $errors.name}
					<p class="text-sm text-destructive">{$errors.name}</p>
				{/if}
			</div>
			<div class="self-end">
				<Button type="submit">Create task</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
