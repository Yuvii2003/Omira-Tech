<script>
	import { GradientButton } from 'flowbite-svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	export let data;
	let product = data.props.product;
	let totalPrice;
	if (product.discount) {
		totalPrice = Math.round((product.price * 100) / (100 - product.discount));
	} else {
		totalPrice = product.price;
	}
	async function handleClick(e) {
		e.preventDefault();
		const cartdata = {
			id: product.id,
			title: product.title,
			image: product.image,
			price: product.price,
			brand: product.brand,
			model: product.model,
			color: product.color,
			discount: product.discount,
			quantity: 1,
			totalPrice: totalPrice
		};
		const response = await fetch('/cart/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cartdata)
		});
		if (response.ok) {
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
<div class="mx-10 flex flex-col gap-10">
	<div class="flex flex-row justify-between gap-6">
		<div class="flex w-[35%] justify-center rounded-md bg-slate-200 py-4 shadow-md">
			<img
				src={product.image}
				alt={product.brand + ' ' + product.model}
				class="w-96 mix-blend-multiply"
			/>
		</div>
		<div class="flex w-[60%] flex-col gap-16">
			<div class="flex flex-col gap-5">
				<h1 class="text-wrap text-xl">{product.title}</h1>
				<div class="opacity-70">
					{product.brand[0].toUpperCase() + product.brand.slice(1)}
					{product.model}
				</div>
				<div class="flex flex-row items-end gap-6">
					<span class="text-xl font-bold">${product.price}</span>
					<span class="tex-md line-through">${totalPrice}</span>
					<span class="font-bold text-green-600">{product.discount}% off</span>
				</div>
				<div class="text-lg">+ Free Delivery</div>
				<div>Color: {product.color[0].toUpperCase() + product.color.slice(1)}</div>
			</div>
			<div>
				<GradientButton color="purple" class="px-16" on:click={handleClick}
					>Add to Cart</GradientButton
				>
			</div>
		</div>
	</div>
	<div class="text-xl">{product.description}</div>
</div>
