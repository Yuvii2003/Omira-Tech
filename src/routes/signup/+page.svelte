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
	$: if (form?.message !== '') {
		isSpinner = false;
	}

	let isSpinner = false;
</script>

<div class="flex h-[80vh] w-full flex-row items-center justify-center">
	<form
		class="flex w-[30%] flex-col gap-4 rounded-md bg-teal-200 bg-opacity-70 p-6"
		method="post"
		use:enhance
	>
		<p class="text-center text-xl">Create an account</p>
		<p class="text-red-500">
			{#if isSpinner}
				<Spinner color="purple" />
			{:else if form?.message !== ''}
				{form?.message || ''}
			{/if}
		</p>
		<div class="flex flex-col gap-1">
			<label for="name" class="text-sm">Name</label>
			<input type="text" name="name" id="name" class="rounded-md" value={form?.data?.name || ''} />
		</div>
		<div class="flex flex-col gap-1">
			<label for="username" class="text-sm">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				class="rounded-md"
				value={form?.data?.userName || ''}
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="email" class="text-sm">Email</label>
			<input
				type="text"
				name="email"
				id="email"
				class="rounded-md"
				value={form?.data?.email || ''}
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="password" class="text-sm">Password</label>
			<input type="password" name="password" id="password" class="rounded-md" />
		</div>
		<div class="flex flex-col gap-1">
			<label for="passwordconfirm" class="text-sm">Confirm Password</label>
			<input type="password" name="passwordconfirm" id="passwordconfirm" class="rounded-md" />
		</div>
		<div class="flex flex-col justify-center gap-4">
			<div class="flex justify-center">
				<Button color="blue" type="submit" on:click={() => (isSpinner = true)}>Create</Button>
			</div>
			<p>
				Already have an account, <a href="/login" class="cursor-pointer text-blue-600 underline"
					>click here</a
				>
			</p>
		</div>
	</form>
</div>
