<script>
	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Spinner, Badge, Button } from 'flowbite-svelte';

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

<div transition:blur class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-16">
	<!-- Hero Section -->
	<div class="relative mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-primary-50 px-4 py-16 text-center shadow-inner border border-purple-100/50 dark:border-gray-800 dark:from-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
		<!-- Decorative background glow -->
		<div class="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-300/40 blur-3xl dark:bg-purple-900/20"></div>
		<div class="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary-300/40 blur-3xl dark:bg-primary-900/20"></div>
		
		<div class="relative z-10">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
				Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r to-primary-600 from-purple-500">Omira-Tech</span>
			</h1>
			<p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
				A one-stop solution for all your tech product needs
			</p>
		</div>
	</div>

	<!-- Categories Section -->
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Explore categories</h2>
		<div class="flex flex-wrap items-center gap-3">
			{#if loading}
				<div class="flex w-full justify-center py-4"><Spinner color="purple" /></div>
			{:else if error}
				<div class="text-red-500">Error: {error}</div>
			{:else if categories.length}
				{#each categories as category}
					<Button outline pill color="dark" on:click={() => goto(`/products?category=${category.category.toLowerCase()}`)}>
						{category.category}
					</Button>
				{/each}
			{:else}
				<div class="text-gray-500">No categories available</div>
			{/if}
		</div>
	</div>

	<!-- Products Section -->
	<div class="flex flex-col gap-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Popular products</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
			{#if loading}
				<div class="col-span-full flex justify-center py-12"><Spinner color="purple" size="10" /></div>
			{:else if error}
				<div class="col-span-full text-red-500">Error: {error}</div>
			{:else if products.length === 0}
				<div class="col-span-full text-center text-gray-500">No products found</div>
			{:else}
				{#each products as product}
					<div class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
						<button class="relative flex h-64 w-full items-center justify-center overflow-hidden bg-gray-50 p-6 dark:bg-gray-900" on:click={() => goto(`/products/${product.id}`)}>
							<img src={product.image} alt={product.title} loading="lazy" class="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110 dark:mix-blend-normal" />
							{#if product?.discount}
								<div class="absolute left-3 top-3">
									<Badge color="red" rounded>-{product?.discount ?? 0}%</Badge>
								</div>
							{/if}
						</button>
						<div class="flex flex-col flex-1 p-5">
							<div class="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
								<span class="font-medium uppercase tracking-wider">{product.brand}</span>
								<span>{product.color ? product.color.charAt(0).toUpperCase() + product.color.slice(1) : ''}</span>
							</div>
							<button class="mb-3 block text-start text-lg font-bold text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-500 line-clamp-2" on:click={() => goto(`/products/${product.id}`)}>
								{product.title}
							</button>
							<div class="mt-auto flex items-end justify-between">
								<div>
									<span class="text-2xl font-extrabold text-gray-900 dark:text-white">${product.price}</span>
									{#if product?.discount}
										<span class="ml-2 text-sm text-gray-500 line-through">${Math.round((product.price * 100) / (100 - product.discount))}</span>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
