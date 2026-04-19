<script>
	import LeftProducts from './LeftProducts.svelte';
	import RightPrice from './RightPrice.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	export let data;

	async function placeOrder() {
		try {
			const response = await fetch('/cart/placeOrder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const result = await response.json();
				data.cartData.cartItems = [];
				toast.success('Order placed successfully', {
					position: 'bottom-right'
				});
			} else {
				toast.error('Error occurred while placing order!', {
					position: 'bottom-right'
				});
				console.error('Server error occurred:', response.statusText);
			}
		} catch (err) {
			toast.error('Network error occurred while placing order!', {
				position: 'bottom-right'
			});
			console.error('Network error occurred:', err);
		}
	}
</script>

<div class="mr-6 flex h-full w-full flex-row justify-center gap-5 align-middle">
	<Toaster />
	<div class="h-full w-[60%]"><LeftProducts bind:data={data.cartData.cartItems} /></div>
	<div class="w-[30%]">
		<RightPrice bind:data={data.cartData.cartItems} on:placeOrder={placeOrder} />
	</div>
</div>
