<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import type { Session } from "lucia";
	import { enhance } from "$app/forms";

	export let session: Session;
</script>

<DropdownMenu.Root positioning={{ placement: "bottom-end" }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8" delayMs={300}>
				<Avatar.Image src="https://i.pravatar.cc/32" alt={session.user.username} />
				<Avatar.Fallback>{session.user.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{session.user.full_name ?? ""}</p>
				<p class="text-xs leading-none text-muted-foreground">@{session.user.username}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>New Team</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<form action="?/logout" method="POST" use:enhance>
			<DropdownMenu.Item asChild let:builder>
				<button
					class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full"
					tabindex="-1"
					use:builder.action
					{...builder}
					type="submit"
				>
					Log out
					<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
				</button>
			</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
