<script>
	import CartProduct from './CartProduct.svelte';
	export let data;

	async function handleDelete(e) {
		try {
			data = data.filter((item) => item.id !== e.detail);
			const response = await fetch('/cart/deleteProduct', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: e.detail })
			});
			if (response.ok) {
				console.log('Data deleted successfully');
			} else {
				console.error('Error occurred while deleting the data');
				alert('Failed to delete product from cart.');
			}
		} catch (error) {
			console.error('Network error occurred:', error);
			alert('An error occurred. Please try again later.');
		}
	}

	function updateQuantity(e) {
		data = data.map((item) =>
			item.id === e.detail.id ? { ...item, quantity: e.detail.quantity } : item
		);
	}
</script>

<div class="flex flex-col gap-8 rounded-md bg-gray-200 p-5 shadow-lg">
	<p class="border-b-2 border-black pb-2 text-xl font-bold">Shopping Cart</p>
	{#if data.length > 0}
		<div class="flex flex-col gap-2">
			{#each data as product}
				<CartProduct
					bind:product
					on:handleDelete={handleDelete}
					on:updateQuantity={updateQuantity}
				/>
			{/each}
		</div>
	{:else}
		<div class="flex h-20 flex-row items-center justify-center">
			<a href="/products" class="text-blue-700">click here to go to products</a>
		</div>
	{/if}
</div>
