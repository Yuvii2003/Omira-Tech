<script>
	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';

	let products = [];
	let categories = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		await getCategories();
		await getProducts();
	});

	async function getProducts() {
		try {
			const response = await fetch(`/api/products`);
			if (!response.ok) {
				throw new Error('Failed to fetch products');
			}
			const data = await response.json();
			products = data.products;
			console.log(products);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function getCategories() {
		try {
			const response = await fetch('/api/categories');
			if (!response.ok) {
				throw new Error('Failed to fetch categories');
			}
			categories = await response.json();
			categories = categories.categories;
			console.log(categories);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<div transition:blur class="mx-8 flex flex-col gap-16">
	<div class="flex flex-col gap-4">
		<h1 class="text-5xl">Welcome to Omira-Tech </h1>
		<div>A one-stop solution for all tech products</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="text-lg">Explore categories:</div>
		<div class="flex flex-row justify-between">
			{#if loading}
				<Spinner color="purple" />
			{:else if error}
				<div class="text-red-500">Error: {error}</div>
			{:else if categories.length}
				{#each categories as category}
					<button
						class="rounded-md bg-slate-300 px-16 py-3"
						on:click={() => goto(`/products?category=${category.category.toLowerCase()}`)}
						>{category.category}</button
					>
				{/each}
			{:else}
				<div>No categories available</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="text-lg">Popular products:</div>
		<div class="flex flex-row flex-wrap justify-between gap-2 gap-y-6">
			{#if products.length === 0}
				<Spinner color="purple" />
			{:else}
				{#each products as product}
					<div
						class="flex flex-col gap-4 overflow-hidden rounded-lg border-2 bg-slate-50 px-2 py-2 pb-5 duration-300 hover:shadow-xl"
					>
						<button class="rounded-sm" on:click={() => goto(`/products/${product.id}`)}>
							<img
								src={product.image}
								alt={product.title}
								loading="lazy"
								class="h-72 w-64 scale-[0.8] rounded-xl object-contain mix-blend-multiply"
							/>
						</button>
						<button
							class="block w-full max-w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap pl-1 text-start font-bold"
							on:click={() => goto(`/products/${product.id}`)}
						>
							{product.title}
						</button>
						<div class="flex flex-row justify-between px-1">
							<div>{product.brand.toUpperCase()}</div>
							<div>
								{product.color
									? product.color.charAt(0).toUpperCase() + product.color.slice(1)
									: ''}
							</div>
						</div>
						<div class="flex w-full flex-row justify-between pl-1">
							<span class="text-lg"
								>Buy for <span class="font-bold">${product.price} </span>
								<span class="pl-2 text-sm line-through"
									>${Math.round((product.price * 100) / (100 - (product?.discount ?? 0)))}
								</span></span
							>
							<span class="font-bold text-green-700">
								{product?.discount ?? '0'}% off
							</span>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
