<script>
	import { createEventDispatcher } from 'svelte';
	import { GradientButton } from 'flowbite-svelte';
	const dispatch = createEventDispatcher();
	function handleAdd(e) {
		e.preventDefault();
		dispatch('click');
	}
</script>

<div class="flex w-full flex-row justify-center align-middle">
	<form on:submit|preventDefault={handleAdd}>
		<GradientButton
			color="cyan"
			type="submit"
			on:click={handleAdd}
			class="font-bold text-white duration-300">Add to cart</GradientButton
		>
	</form>
</div>
