import Cart from '$lib/models/Cart';
import connectDB from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	if (cookies.get('username')) {
		await connectDB();
		const cookie = cookies.get('username');
		const cartResult = await Cart.findOne({ userName: cookie });

		if (cartResult) {
			const serializedCart = cartResult.toObject({
				transform: (doc, ret) => {
					ret._id = ret._id.toString();
					if (ret.cartItems && Array.isArray(ret.cartItems)) {
						ret.cartItems = ret.cartItems.map((item) => {
							item._id = item._id.toString();
							return item;
						});
					}
					return ret;
				}
			});

			return {
				cartData: serializedCart
			};
		} else {
			return {
				cartData: []
			};
		}
	} else {
		throw redirect(303, '/login');
	}
}
