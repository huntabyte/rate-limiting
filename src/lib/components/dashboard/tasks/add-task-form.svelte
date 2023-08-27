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
	import * as Alert from "$lib/components/ui/alert";
	import { Button } from "$lib/components/ui/button";
	import { Reload } from "radix-icons-svelte";
	import type { Task } from "@prisma/client";
	import { onMount } from "svelte";

	export let data: SuperValidated<CreateTaskSchema>;
	export let addTask: (task: Task) => void;

	let dialogOpen = false;

	const { form, errors, enhance, delayed, message } = superForm(data, {
		taintedMessage: null,

		validators: createTaskSchema,
		resetForm: true,
		delayMs: 700,
		onSubmit: ({ formData, formElement }) => {
			const task = Object.fromEntries(formData) as Task;
			addTask(task);
			dialogOpen = false;
			formElement.reset();
		}
	});

	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "c") {
				dialogOpen = true;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]} class="inline-flex items-center">
			<div>Create task</div>
			<div class="ml-2 px-2 py-0.5 text-xs bg-muted text-muted-foreground font-mono rounded">C</div>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="top-[25%]">
		<Dialog.Header>
			<Dialog.Title>Add task</Dialog.Title>
			<Dialog.Description
				>A more descriptive names increases its chance of completion!</Dialog.Description
			>
		</Dialog.Header>
		{#if $message}
			<Alert.Root variant="destructive">
				<Alert.Title>Error:</Alert.Title>
				<Alert.Description>
					{$message}
				</Alert.Description>
			</Alert.Root>
		{/if}
		<form action="?/createTask" method="POST" use:enhance class="flex flex-col space-y-6">
			<div class="grid gap-2">
				<Label for="name">Name</Label>
				<Input id="name" name="name" bind:value={$form.name} autocomplete="off" />
				{#if $errors.name}
					<p class="text-sm text-destructive">{$errors.name}</p>
				{/if}
			</div>
			<div class="self-end">
				<Button type="submit" disabled={$delayed}>
					{#if $delayed}
						<Reload class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Create task
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
