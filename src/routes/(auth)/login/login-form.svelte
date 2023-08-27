<script lang="ts">
	import { GitHub } from "$lib/components/icons";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { cn } from "$lib/utils";
	import { Symbol } from "radix-icons-svelte";

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form method="POST">
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					name="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input
					id="password"
					type="password"
					name="password"
					autocapitalize="none"
					autocomplete="password"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button disabled={isLoading}>
				{#if isLoading}
					<Symbol class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In with Email
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>
	<Button href="/login/github" variant="outline">
		<GitHub class="mr-2 h-4 w-4" />
		GitHub
	</Button>
</div>
