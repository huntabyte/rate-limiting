<script lang="ts">
	import { page } from "$app/stores";
	import { Logo, UserNav } from "$lib/components";
	import { Button } from "$lib/components/ui/button";

	const navigation = [
		{
			label: "About",
			href: "/about"
		},
		{
			label: "Blog",
			href: "/blog"
		}
	];
</script>

<header class="bg-background/75 backdrop-blur border-b border-border -mb-px sticky top-0 z-50">
	<div class="mx-auto px-4 sm:px-6 lg:px-8 container">
		<div class="flex items-center justify-between gap-3 h-16">
			<div class="flex items-center gap-8">
				<a href="/" class="text-2xl flex items-center gap-2">
					<Logo class="w-8 h-8" />
					<span class="font-bold tracking-tight text-2xl">tasker</span>
				</a>
				<div class="items-center flex gap-6">
					{#each navigation as nav}
						<div>
							<a href={nav.href}>{nav.label}</a>
						</div>
					{/each}
				</div>
			</div>
			<div class="flex items-center gap-3">
				{#if $page.data.session}
					<Button variant="ghost" href="/tasks">My Tasks</Button>
					<UserNav session={$page.data.session} />
				{:else}
					<Button variant="ghost" href="/login">Log in</Button>
					<Button href="/sign-up">Sign Up</Button>
				{/if}
			</div>
		</div>
	</div>
</header>
