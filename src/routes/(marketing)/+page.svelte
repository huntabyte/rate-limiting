<script lang="ts">
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
</script>

<div class="flex flex-col items-center w-full">
	<div class="flex flex-col gap-3 text-center mt-20 max-w-5xl w-full mx-auto">
		<h1 class="text-5xl font-bold tracking-tight lg:text-6xl">Task management made easy.</h1>
		<p class="text-2xl text-muted-foreground max-w-lg mx-auto">
			Manage your tasks with ease. No more sticky notes, no more forgotten tasks.
		</p>
	</div>
	<div class="flex items-center gap-4 mt-8">
		<Button href={$page.data.session ? "/dashboard" : "/sign-up"}>Get started</Button>
		<Button variant="outline" href="https://github.com/huntabyte/tasker" target="_blank"
			>View on Github</Button
		>
	</div>
</div>
