<script lang="ts">
	import type { Task } from "@prisma/client";
	import * as Table from "$lib/components/ui/table";
	import { Badge } from "$lib/components/ui/badge";

	export let tasks: Task[] = [];
</script>

<div class="w-full">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Category</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each tasks as task}
				<Table.Row>
					<Table.Cell class="py-4">{task.name}</Table.Cell>
					<Table.Cell>
						<Badge variant="outline">work</Badge>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
