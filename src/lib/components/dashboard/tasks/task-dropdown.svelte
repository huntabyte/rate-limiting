<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { DotsHorizontal } from "radix-icons-svelte";
	import { cn } from "$lib/utils";

	export let id: string;
</script>

<DropdownMenu.Root portal={null} positioning={{ placement: "bottom-end" }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="ghost">
			<DotsHorizontal class="h-4 w-4" />
			<span class="sr-only">Open menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item asChild let:builder let:styles>
			<button
				use:builder.action
				{...builder}
				class={cn(styles, "w-full")}
				type="submit"
				formaction="?/deleteTask&id={id}"
			>
				Delete
			</button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
