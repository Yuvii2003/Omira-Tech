<script>
	import { Button, Spinner } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { loggedIn } from '$lib/store';
	import { goto } from '$app/navigation';
	export let form;
	$: if (form?.status === 200) {
		loggedIn.set(true);
		goto('/products');
	}
	let isSpinner = false;
	$: if (form?.message !== '') {
		isSpinner = false;
	}
</script>

<div class="flex h-[80vh] w-full flex-row items-center justify-center">
	<form
		class="flex w-[30%] flex-col gap-4 rounded-md bg-teal-200 bg-opacity-70 p-6"
		method="post"
		use:enhance
	>
		<p class="text-center text-xl">Login to your account</p>
		<p class="text-red-500">
			{#if isSpinner}
				<Spinner color="purple" />
			{:else if form?.message !== ''}
				{form?.message || ''}
			{/if}
		</p>
		<div class="flex flex-col gap-1">
			<label for="username" class="text-sm">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				class="rounded-md"
				required
				value={form?.userName || ''}
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="text-sm">Password</label>
			<input type="password" name="password" id="password" class="rounded-md" required />
		</div>
		<div class="flex flex-col justify-center gap-4">
			<div class="flex justify-center">
				<Button color="purple" type="submit" on:click={() => (isSpinner = true)}>Login</Button>
			</div>
			<p>
				Want to create an account, <a class="cursor-pointer text-blue-600 underline" href="/signup"
					>click here</a
				>
			</p>
		</div>
	</form>
</div>
