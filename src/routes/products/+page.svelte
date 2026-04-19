<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LeftNav from './LeftNav.svelte';
	import RightContent from './RightContent.svelte';
	import { Spinner, Button } from 'flowbite-svelte';

	let products = [];
	let isLoading = true;
	let currentPage = 1;
	let totalPages = 1;
	let limit = 12;

	async function fetchData(page = 1) {
		isLoading = true;
		const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
		const data = await response.json();
		products = data.products;
		currentPage = data.currentPage;
		totalPages = data.totalPages;
		isLoading = false;
	}

	async function sortByCategory(category, page = 1) {
		category = category.toLowerCase();
		isLoading = true;
		const response = await fetch(`/api/products?category=${category}`);
		const data = await response.json();
		products = data.products;
		currentPage = data.currentPage;
		totalPages = data.totalPages;
		isLoading = false;
	}

	async function sortByCategoryNav(e, page = 1) {
		let query = e.detail.toLowerCase();
		isLoading = true;
		const response = await fetch(`/api/products?category=${query}`);
		const data = await response.json();
		products = data.products;
		currentPage = data.currentPage;
		totalPages = data.totalPages;
		isLoading = false;
	}

	async function sortData(e, page = 1) {
		if (e.detail === 0) {
			fetchData();
		} else {
			isLoading = true;
			const response = await fetch(
				`/api/products/sort?page=${page}&limit=${limit}&sort=${e.detail}`
			);
			const data = await response.json();
			products = data.products;
			currentPage = data.currentPage;
			totalPages = data.totalPages;
			isLoading = false;
		}
	}

	async function handlefetchAll() {
		await fetchData();
	}

	onMount(async () => {
		const queryParams = new URLSearchParams($page.url.search);
		const category = queryParams.get('category');

		if (category) {
			await sortByCategory(category);
		} else {
			await fetchData();
		}
	});
</script>

{#if isLoading}
	<div class="flex h-[80vh] items-center justify-center">
		<Spinner color="purple" />
	</div>
{:else}
	<div class="mx-auto mb-5 flex max-w-7xl flex-col gap-10 px-4 md:px-0">
		<div class="flex flex-col">
			<div class="flex flex-col items-start gap-8 md:flex-row">
				<aside class="w-full shrink-0 md:w-64 lg:w-72">
					<LeftNav on:click={sortByCategoryNav} on:fetchAll={handlefetchAll} />
				</aside>
				<main class="flex w-full min-w-0 flex-1 justify-center">
					<RightContent {products} on:sort={sortData} />
				</main>
			</div>
		</div>
		<div class="flex flex-row justify-center gap-8 md:ml-[14%] md:gap-16">
			{#if currentPage > 1}
				<Button color="light" class="w-24" on:click={() => fetchData(currentPage - 1)}>
					Previous
				</Button>
			{/if}
			{#if currentPage < totalPages}
				<Button color="light" class="w-24" on:click={() => fetchData(currentPage + 1)}>Next</Button>
			{/if}
		</div>
	</div>
{/if}
