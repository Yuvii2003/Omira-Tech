import User from '$lib/models/User.js';
import connectDB from '$lib/db.js';
import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';
import Cart from '$lib/models/Cart.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name');
		const userName = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		const confirmPassword = data.get('passwordconfirm');
		var re = /\S+@\S+\.\S+/;
		const returnData = {
			name,
			userName,
			email
		};
		if (name.length === 0) {
			return fail(400, {
				data: returnData,
				message: "Name can't be empty!"
			});
		}
		if (userName.length < 4) {
			return fail(400, {
				data: returnData,
				message: 'Username should be minimum of 4 characters!'
			});
		}
		if (!re.test(email)) {
			return fail(400, {
				data: returnData,
				message: 'Please enter a valid email!'
			});
		}
		if (password.length < 4) {
			return fail(400, {
				data: returnData,
				message: 'Password should be minimum of 4 characters!'
			});
		}
		if (confirmPassword !== password) {
			return fail(400, {
				data: returnData,
				message: "Confirm password doesn't match!"
			});
		}
		await connectDB();
		const dbData = await User.findOne({ userName });
		if (dbData) {
			return fail(400, {
				data: returnData,
				message: 'Username already exists!'
			});
		}

		const dbData2 = await User.findOne({ email });
		if (dbData2) {
			return fail(400, {
				data: returnData,
				message: 'Email already exists!'
			});
		}

		const hash = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			userName,
			email,
			password: hash
		});

		const newUserCart = new Cart({
			userName,
			cartItems: []
		});

		await newUser.save();
		await newUserCart.save();
		await cookies.set('username', userName, { path: '/' });
		return {
			status: 200,
			body: {
				userName: userName
			}
		};
	}
};
