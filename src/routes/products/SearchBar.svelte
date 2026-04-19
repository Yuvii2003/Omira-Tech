<script>
	import { SearchOutline } from 'flowbite-svelte-icons';
	export let search = '';
</script>

<div class="flex flex-row rounded-md">
	<button class="z-10 mr-[-28px]"><SearchOutline /></button>
	<input
		type="text"
		class="w-[13rem] rounded-md pl-10"
		placeholder="Search..."
		bind:value={search}
	/>
</div>
