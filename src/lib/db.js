import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error('MONGODB_URI is missing in .env');
}

export default async function connectDB() {
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection;
	}

	try {
		await mongoose.connect(uri);
		console.log('MongoDB connected');
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	}
}