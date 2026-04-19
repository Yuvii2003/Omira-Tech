<script>
	import UpperContent from './UpperContent.svelte';
	import LowerContent from './LowerContent.svelte';
	export let products;
	let search;
</script>

<div class="mr-4 flex w-[85%] flex-col gap-4 border-l-2 px-4">
	<UpperContent bind:search on:sort />
	<LowerContent {products} bind:search />
</div>
