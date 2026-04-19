<script>
	export let data;
	export let form;
</script>

<h1 class="text-3xl font-bold mb-8 text-center mt-10">Our Shop</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-10">
	{#each data.products as product}
		<div class="border rounded-lg p-4 shadow flex flex-col">
			{#if product.image}
				<img src={product.image} alt={product.title} class="w-full h-48 object-cover mb-4 rounded" />
			{/if}
			<h2 class="text-xl font-semibold">{product.title}</h2>
			<p class="text-gray-500 text-sm mb-2">{product.brand || 'No Brand'} - {product.category || 'General'}</p>
			<p class="font-bold text-lg mb-2">${product.price}</p>
			<p class="text-gray-700 text-sm mb-4 flex-grow">{product.description || ''}</p>
			
			<button class="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 font-bold mt-auto">
				Add to Cart
			</button>
		</div>
	{:else}
		<p class="text-center col-span-full text-gray-500">No products available yet. Check back later!</p>
	{/each}
</div>

	


<div class="max-w-lg mx-auto mt-10">
	<h1 class="text-2xl font-bold mb-4">Add a New Product</h1>
	
	{#if form?.success}
		<div class="p-4 mb-4 text-green-800 bg-green-200 rounded">{form.message}</div>
	{/if}
	{#if form?.message && !form?.success}
		<div class="p-4 mb-4 text-red-800 bg-red-200 rounded">{form.message}</div>
	{/if}

	<form method="POST" class="flex flex-col gap-4">
		<input type="text" name="title" placeholder="Product Title" required class="border p-2 rounded" />
		<input type="number" name="price" placeholder="Price ($)" step="0.01" required class="border p-2 rounded" />
		<input type="text" name="image" placeholder="Image URL (e.g., https://...)" class="border p-2 rounded" />
		<textarea name="description" placeholder="Description" class="border p-2 rounded"></textarea>
		<input type="text" name="brand" placeholder="Brand" class="border p-2 rounded" />
		<input type="text" name="category" placeholder="Category" class="border p-2 rounded" />
		
		<button type="submit" class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">Add Product</button>
	</form>
</div>
