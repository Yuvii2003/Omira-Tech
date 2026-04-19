import Product from '$lib/models/Product';
import connectDB from '$lib/db';

export async function load({ params }) {
	const { productId } = params;

	try {
		await connectDB();
		const product = await Product.findOne({ id: productId });
		if (!product) {
			return {
				status: 404,
				error: new Error('Product not found')
			};
		}
		const productData = product.toObject ? product.toObject() : product;
		const serializedProduct = {
			_id: productData._id.toString(),
			id: productData.id,
			title: productData.title,
			image: productData.image,
			price: productData.price,
			description: productData.description,
			brand: productData.brand,
			model: productData.model,
			color: productData.color,
			category: productData.category,
			discount: productData.discount
		};

		return {
			props: {
				product: serializedProduct
			}
		};
	} catch (err) {
		return {
			status: 500,
			error: new Error('Error occurred while loading data!', err)
		};
	}
}
