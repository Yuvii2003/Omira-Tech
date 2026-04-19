import mongoose from 'mongoose';
const itemSchema = new mongoose.Schema({
	id: Number,
	title: String,
	image: String,
	price: Number,
	brand: String,
	model: String,
	color: String,
	discount: Number,
	quantity: Number,
	totalPrice: Number
});

const cartSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	cartItems: [itemSchema]
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
