<script>
	import AddToCartBtn from './AddToCartBtn.svelte';
	import { goto } from '$app/navigation';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data = {};
	async function handleClick(e) {
		e.preventDefault();
		const cartdata = {
			id: data.id,
			title: data.title,
			image: data.image,
			price: data.price,
			brand: data.brand,
			model: data.model,
			color: data.color,
			discount: data.discount,
			quantity: 1,
			totalPrice: Math.round((data.price * 100) / (100 - data.discount))
		};
		const response = await fetch('/cart/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cartdata)
		});
		if (response.ok) {
			console.log(response);
			toast.success('Item added to cart', {
				position: 'bottom-right'
			});
		} else {
			toast.error('Error occurred while adding to cart', {
				position: 'bottom-right'
			});
		}
	}
</script>

<Toaster />
<div
	class="flex flex-col gap-4 overflow-hidden rounded-lg border-2 bg-slate-50 px-2 py-2 pb-5 duration-300 hover:shadow-xl"
>
	<button class="rounded-sm" on:click={() => goto(`/products/${data.id}`)}>
		<img
			src={data.image}
			alt={data.title}
			loading="lazy"
			class="h-72 w-64 scale-[0.8] rounded-xl object-contain mix-blend-multiply"
		/>
	</button>
	<button
		class="block w-full max-w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap pl-1 text-start font-bold"
		on:click={() => goto(`/products/${data.id}`)}
	>
		{data.title}
	</button>
	<div class="flex flex-row justify-between px-1">
		<div>{data.brand.toUpperCase()}</div>
		<div>
			{data.color ? data.color.charAt(0).toUpperCase() + data.color.slice(1) : ''}
		</div>
	</div>
	<div class="flex w-full flex-row justify-between pl-1">
		<span class="text-lg"
			>Buy for <span class="font-bold">${data.price} </span>
			<span class="pl-2 text-sm line-through"
				>${Math.round((data.price * 100) / (100 - (data?.discount ?? 0)))}
			</span></span
		>
		<span class="font-bold text-green-700">
			{data?.discount ?? '0'}% off
		</span>
	</div>
	<AddToCartBtn on:click={handleClick} />
</div>
