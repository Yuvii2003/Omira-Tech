<script>
	import { AngleDownOutline } from 'flowbite-svelte-icons';
	import Button from './Button.svelte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let categories = [];
	onMount(() => {
		fetchData();
	});
	async function fetchData() {
		const result = await fetch('/api/categories');
		const data = await result.json();
		categories = data.categories;
	}
	function fetchAll() {
		dispatch('fetchAll');
	}
</script>

<div class="w-[15%]">
	<div class="fixed w-[15%]">
		<Button on:click={fetchAll} role="button" tabindex="0">
			<div class="flex flex-row justify-between">
				All<span><AngleDownOutline /></span>
			</div>
		</Button>
		{#each categories as category}
			<Button bind:category={category.category} on:click>{category.category}</Button>
		{/each}
	</div>
</div>
