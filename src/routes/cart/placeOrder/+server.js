import connectDB from '$lib/db';
import Cart from '$lib/models/Cart';
import { redirect, json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	try {
		const userName = cookies.get('username');
		if (!userName) {
			throw redirect(300, '/login');
		}
		await connectDB();
		let cart = await Cart.findOne({ userName: userName });
		if (!cart) {
			cart = new Cart({ userName, cartItems: [] });
		}
		// Empty the cart
		cart.cartItems = [];
		const updatedCart = await cart.save();

		return json({
			data: updatedCart,
			status: 200,
			message: 'All items deleted successfully'
		});
	} catch (err) {
		console.log("Couldn't place order", err);
		return json({ error: "Couldn't place order", status: 500 });
	}
}
