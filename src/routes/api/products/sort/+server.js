import Product from '$lib/models/Product.js';
import connectDB from '$lib/db.js';

export async function GET({ url }) {
	await connectDB();
	const page = parseInt(url.searchParams.get('page')) || 1;
	const limit = parseInt(url.searchParams.get('limit')) || 12;
	const sortVal = parseInt(url.searchParams.get('sort')) || 0;
	const skip = (page - 1) * limit;

	const products = await Product.find({}).sort({ price: sortVal }).skip(skip).limit(limit).lean();
	const totalProducts = await Product.countDocuments({});
	const totalPages = Math.ceil(totalProducts / limit);

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
