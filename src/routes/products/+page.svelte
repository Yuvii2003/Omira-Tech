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
	<div class="mb-5 flex flex-col gap-10">
		<div class="flex flex-col">
			<div class="flex flex-row gap-8">
				<LeftNav on:click={sortByCategoryNav} on:fetchAll={handlefetchAll} />
				<RightContent {products} on:sort={sortData} />
			</div>
		</div>
		<div class="ml-[14%] flex flex-row justify-center gap-16">
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
