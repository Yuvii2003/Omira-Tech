import Product from '$lib/models/Product.js';
import connectDB from '$lib/db.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		
		const title = data.get('title');
		const price = Number(data.get('price'));
		const image = data.get('image');
		const description = data.get('description');
		const brand = data.get('brand');
		const category = data.get('category');

		if (!title || !price) {
			return fail(400, { message: 'Title and price are required!' });
		}

		await connectDB();
		const newProduct = new Product({
			id: Date.now(), // Generates a simple unique numeric ID
			title,
			price,
			image,
			description,
			brand,
			category
		});

		await newProduct.save();
		return { success: true, message: 'Product successfully added to the shop!' };
	}
};
