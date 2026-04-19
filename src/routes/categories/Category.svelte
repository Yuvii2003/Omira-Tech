<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let category;
	function handleDispatch() {
		dispatch('click');
	}
</script>

<button
	class="flex h-auto w-[18%] flex-col justify-between gap-2 overflow-hidden rounded-lg border-4 border-slate-300 bg-gray-100 p-1 align-middle duration-500 hover:shadow-xl"
	on:click={handleDispatch}
>
	<div>
		<img
			src={category.img}
			alt={category.category}
			class={(category.category === 'Laptop' ? 'translate-y-4' : '') + ' scale-[0.85] rounded-md'}
		/>
	</div>
	<div class="flex w-full flex-row justify-center align-middle text-xl font-bold">
		{category.category}
	</div>
</button>
