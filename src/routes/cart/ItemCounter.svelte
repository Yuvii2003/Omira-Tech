<script>
	import { CirclePlusOutline, CircleMinusOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let quantity;

	$: {
		if (quantity < 1) {
			quantity = 1;
		}
		if (quantity > 10) {
			quantity = 10;
		}
	}

	function handleAdd() {
		dispatch('click');
	}
</script>

<div class="flex flex-row justify-center gap-2 pb-2 align-middle">
	<button
		class="flex flex-col justify-center align-middle"
		on:click={() => {
			if (quantity > 1) {
				quantity--;
				handleAdd();
			}
		}}
	>
		<CircleMinusOutline />
	</button>
	<div class="h-9 w-12">
		<input
			type="number"
			class="w-full appearance-none rounded-md text-center hover:outline-none focus:outline-none"
			bind:value={quantity}
		/>
	</div>
	<button
		class="flex flex-col justify-center align-middle"
		on:click={() => {
			if (quantity < 10) {
				quantity++;
				handleAdd();
			}
		}}
	>
		<CirclePlusOutline />
	</button>
</div>
