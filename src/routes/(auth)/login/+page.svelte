<script lang="ts">
	import LoginForm from "./login-form.svelte";
</script>

<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Log in to your account</h1>
		<p class="text-sm text-muted-foreground">Enter your email below to create your account</p>
	</div>
	<LoginForm />
	<p class="px-8 text-center text-sm text-muted-foreground">
		By clicking continue, you agree to our
		<a href="/sign-up" class="underline underline-offset-4 hover:text-primary">
			Terms of Service
		</a>
		and
		<a href="/sign-up" class="underline underline-offset-4 hover:text-primary"> Privacy Policy </a>
		.
	</p>
</div>
