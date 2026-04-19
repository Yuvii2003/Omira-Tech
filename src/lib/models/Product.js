import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	id: Number,
	title: String,
	image: String,
	price: Number,
	description: String,
	brand: String,
	model: String,
	color: String,
	category: String,
	discount: Number
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
