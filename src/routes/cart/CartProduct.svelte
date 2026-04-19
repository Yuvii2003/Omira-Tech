<script>
	import ItemCounter from './ItemCounter.svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let product;

	function handleDelete() {
		dispatch('handleDelete', product.id);
	}

	async function handleClick() {
		const response = await fetch('/cart/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...product, quantity: product.quantity })
		});
		if (response.ok) {
			console.log('DB updated successfully');
		} else {
			console.log('Error occurred while updating DB');
		}
	}
</script>

<div class="flex flex-row gap-4 border-b-2 border-gray-400 p-2">
	<div class="flex flex-col justify-center gap-2">
		<div class="flex flex-row justify-center">
			<img src={product.image} alt="productImg" class="h-24 w-24 rounded-sm" />
		</div>
		<div>
			<ItemCounter bind:quantity={product.quantity} on:click={handleClick} />
		</div>
	</div>
	<div class="flex flex-grow flex-row items-start justify-between gap-8 overflow-hidden">
		<div class="flex flex-col gap-1 overflow-hidden">
			<p class="overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</p>
			<p>{product.color}</p>
			<p>{product.brand}</p>
			<p>
				Price: <span class="text-lg">${product.price}</span>
				<span class="ml-1 text-sm line-through">${product.totalPrice}</span>
			</p>
		</div>
		<div class="flex flex-row items-center">
			<button on:click={handleDelete}>
				<TrashBinSolid class="text-indigo-900" size="lg" />
			</button>
		</div>
	</div>
</div>
