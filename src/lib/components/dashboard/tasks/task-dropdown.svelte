<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { Plus } from "radix-icons-svelte";
</script>

<DropdownMenu.Root positioning={{ placement: "bottom-end" }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline">
			<Plus class="h-4 w-4" />
			<span class="sr-only">Open menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Item>Add Category</DropdownMenu.Item>
		<DropdownMenu.Item>Add Color</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
