<script>
	import ProductCard from './ProductCard.svelte';
	export let products;
	export let search = '';
</script>

<div class="flex flex-wrap justify-evenly gap-4">
	{#each products as product}
		{#if search === '' || product.title.toLowerCase().includes(search.toLowerCase())}
			<ProductCard data={product} />
		{/if}
	{/each}
</div>
