<script>
	import SearchBar from './SearchBar.svelte';
	import SortDropdown from './SortDropdown.svelte';
	export let search;
</script>

<div class="flex flex-row justify-between">
	<SortDropdown on:sort />
	<SearchBar bind:search />
</div>
