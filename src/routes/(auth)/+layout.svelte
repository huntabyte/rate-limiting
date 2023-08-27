<script lang="ts">
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
	import Logo from "$lib/components/logo.svelte";

	$: link = {
		label: $page.url.pathname === "/sign-up" ? "Login" : "Sign up",
		href: $page.url.pathname === "/sign-up" ? "/login" : "/sign-up"
	};

	$: console.log($page.url.pathname);
</script>

<div
	class="container relative hidden h-full min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href={$page.url.pathname === "/sign-up" ? "/login" : "/sign-up"}
		variant="ghost"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		{#if $page.url.pathname === "/sign-up"}
			Login
		{:else}
			Sign up
		{/if}
	</Button>
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(https://images.unsplash.com/photo-1573655349936-de6bed86f839?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80"
		/>
		<a
			href="/"
			class="relative z-20 flex items-center gap-2 text-lg font-medium hover:text-muted-foreground transition-colors"
		>
			<Logo class="h-8 w-8" />
			Tasker
		</a>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					"My life was a mess before I found tasker. It's truly a lifesaver and I couln't recommend
					it enough!"
				</p>
				<footer class="text-sm">Paulina Machaj</footer>
			</blockquote>
		</div>
	</div>

	<div class="lg:p-8">
		<slot />
	</div>
</div>
