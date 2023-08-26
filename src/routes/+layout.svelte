<script>
	import SiteHeader from '$lib/components/site-header.svelte';
	import '../app.postcss';
</script>

<div class="relative flex min-h-screen flex-col">
	<SiteHeader />
	<div class="relative container">
		<slot />
	</div>
</div>
