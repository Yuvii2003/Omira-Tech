<script>
	import { blur } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import Category from './Category.svelte';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	let categories = [];
	let spinner = true;

	onMount(() => {
		fetchData();
	});

	async function fetchData() {
		const response = await fetch('/api/categories');
		const data = await response.json();
		categories = data.categories;
		spinner = false;
	}
</script>

<div class="flex flex-wrap justify-evenly gap-4" transition:blur>
	{#if spinner}
		<div class="flex h-screen flex-col items-center justify-center">
			<Spinner color="purple" />
		</div>
	{:else}
		{#each categories as category}
			<Category
				{category}
				on:click={() => goto(`/products?category=${category.category.toLowerCase()}`)}
			/>
		{/each}
	{/if}
</div>
