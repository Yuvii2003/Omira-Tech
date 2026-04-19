<script>
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let categories = [];
	let isOpen = false;

	onMount(() => {
		fetchData();
	});
	async function fetchData() {
		const result = await fetch('/api/categories');
		const data = await result.json();
		categories = data.categories;
	}
	function fetchAll() {
		isOpen = false; // Close menu on mobile when clicked
		dispatch('fetchAll');
	}
	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<div class="w-full">
	<!-- Mobile Toggle Button -->
	<div class="mb-4 md:hidden">
		<button on:click={toggleMenu} class="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-500 to-primary-600 px-4 py-2.5 text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-300">
			<span class="font-semibold text-lg">Categories</span>
			<AngleDownOutline class="transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" />
		</button>
	</div>

	<!-- Categories List -->
	<div class="{isOpen ? 'block' : 'hidden'} w-full md:sticky md:top-24 md:block">
		<Button on:click={fetchAll} role="button" tabindex="0">
			<div class="flex flex-row justify-between">
				All<span><AngleDownOutline /></span>
			</div>
		</Button>
		{#each categories as category}
			<Button bind:category={category.category} on:click on:click={() => (isOpen = false)}>{category.category}</Button>
		{/each}
	</div>
</div>
