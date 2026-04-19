<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let category;
	function handleCLick() {
		dispatch('click', category);
	}
</script>

<button
	class="right-2 ml-3 w-full rounded-sm px-4 py-2 text-left duration-150 active:bg-slate-300"
	on:click={handleCLick}
>
	<slot></slot>
</button>
