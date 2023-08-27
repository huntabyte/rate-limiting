<script lang="ts">
	import { page } from "$app/stores";
	import { Logo, UserNav } from "$lib/components";
</script>

<header class="bg-background/75 backdrop-blur border-b border-border -mb-px sticky top-0 z-50">
	<div class="mx-auto px-4 sm:px-6 lg:px-8 container">
		<div class="flex items-center justify-between gap-3 h-16">
			<div class="flex items-center gap-8">
				<a href="/dashboard" class="text-2xl flex items-center gap-2">
					<Logo class="w-8 h-8" />
				</a>
			</div>
			<div class="flex items-center gap-3">
				{#if $page.data.session}
					<UserNav session={$page.data.session} />
				{/if}
			</div>
		</div>
	</div>
</header>
