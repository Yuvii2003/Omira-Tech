<script>
	import { GradientButton } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let data;
	$: noOfItems = data.reduce((sum, item) => sum + item.quantity, 0);
	$: totalPrice = data.reduce((sum, item) => item.price * item.quantity + sum, 0);
	$: totalAmount = data.reduce((sum, item) => item.totalPrice * item.quantity + sum, 0);
	$: totalDiscount = totalAmount - totalPrice;
	function dispatchClick() {
		dispatch('placeOrder');
	}
</script>

<div class="fixed flex w-[30%] flex-col gap-4 rounded-md bg-gray-100 p-4 shadow-md">
	<div class="border-b-2 border-slate-300 pb-3 text-lg">Price Details</div>
	{#if noOfItems !== 0}
		<div class="flex w-full flex-row justify-between">
			<span>Price ({noOfItems} {noOfItems === 1 ? 'item' : 'items'})</span>
			<span class="font-bold">$ {totalAmount}</span>
		</div>
		<div class="flex w-full flex-row justify-between">
			<span>Discount</span>
			<span class="font-bold text-green-600">$ {totalDiscount}</span>
		</div>
		<div class="flex w-full flex-row justify-between">
			<span>Delivery Charges</span>
			<span class="font-bold text-green-600">FREE</span>
		</div>
		<div
			class="flex w-full flex-row justify-between border-b-2 border-dashed border-slate-300 py-2 text-lg font-bold"
		>
			<span>Total Amount</span>
			<span>$ {totalPrice}</span>
		</div>
		<div class="font-bold text-green-600">You will save $ {totalDiscount} on this order</div>
		<div class="mt-2 flex flex-row justify-center">
			<GradientButton color="blue" class="w-[50%] rounded-sm" on:click={dispatchClick}
				>Place Order</GradientButton
			>
		</div>
	{:else}
		<div class="flex h-20 flex-row items-center justify-center">
			<div>Your cart is empty!</div>
		</div>
	{/if}
</div>
