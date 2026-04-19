import Cart from '$lib/models/Cart';
import connectDB from '$lib/db';
import { redirect, json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	try {
		const data = await request.json();
		const userName = cookies.get('username');

		if (!userName) {
			throw redirect(302, '/login');
		}

		await connectDB();

		let cart = await Cart.findOne({ userName });

		if (!cart) {
			cart = new Cart({ userName, cartItems: [] });
		}
		cart.cartItems = cart.cartItems.filter((item) => item.id !== data.id);
		cart.cartItems.push(data);

		const updatedCart = await Cart.findOneAndUpdate(
			{ userName },
			{ cartItems: cart.cartItems },
			{ new: true, upsert: true }
		);

		return json({ data: updatedCart, status: 200 });
	} catch (error) {
		console.error('Error updating cart:', error);
		return json({ error: 'Failed to update cart', status: 500 });
	}
}
