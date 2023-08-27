<script lang="ts">
	import { page } from "$app/stores";
	import { Logo, UserNav } from "$lib/components";
	import { Button } from "$lib/components/ui/button";
</script>

<header class="bg-background/75 backdrop-blur border-b border-border -mb-px sticky top-0 z-50">
	<div class="mx-auto px-4 sm:px-6 lg:px-20 container flex flex-col">
		<div class="flex items-center justify-between gap-3 h-16">
			<div class="flex items-center gap-4">
				<a href="/dashboard" class="text-2xl flex items-center gap-2">
					<Logo class="w-8 h-8" />
				</a>
				<Button variant="ghost" href="/dashboard">Tasks</Button>
			</div>
			<div class="flex items-center gap-3">
				{#if $page.data.session}
					<UserNav session={$page.data.session} />
				{/if}
			</div>
		</div>
	</div>
</header>
