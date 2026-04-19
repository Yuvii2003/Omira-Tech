import Product from '$lib/models/Product.js';
import connectDB from '$lib/db.js';

export async function GET({ url }) {
	await connectDB();
	const page = parseInt(url.searchParams.get('page'));
	const limit = parseInt(url.searchParams.get('limit'));
	const categorySort = url.searchParams.get('category') || '';
	const skip = (page - 1) * limit;

	let products;
	let totalProducts;
	let totalPages;

	if (!page && !limit) {
		products = await Product.find({ popular: true }).lean();
		totalProducts = await Product.countDocuments({});
		totalPages = Math.ceil(totalProducts / limit);
	}
	if (categorySort === '') {
		products = await Product.find({}).skip(skip).limit(limit).lean();
		totalProducts = await Product.countDocuments({});
		totalPages = Math.ceil(totalProducts / limit);
	} else {
		products = await Product.find({ category: categorySort }).lean();
		totalProducts = await Product.countDocuments({});
		totalPages = Math.ceil(totalProducts / limit);
	}

	return new Response(
		JSON.stringify({
			products: products.map((product) => ({
				...product,
				_id: product._id.toString()
			})),
			currentPage: page,
			totalPages,
			limit
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}
