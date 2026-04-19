import User from '$lib/models/User.js';
import connectDB from '$lib/db.js';
import bcrypt from 'bcryptjs';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		await connectDB();
		const data = await request.formData();
		const userName = data.get('username');
		const password = data.get('password');
		const dbResult = await User.findOne({ userName });

		if (!dbResult) {
			return fail(400, {
				userName,
				message: "User doesn't exist"
			});
		}

		const isMatch = await bcrypt.compare(password, dbResult.password);

		if (isMatch) {
			cookies.set('username', userName, { path: '/' });
			return {
				status: 200,
				body: {
					userName: userName
				}
			};
		} else {
			return fail(400, {
				userName,
				message: 'Password is incorrect!'
			});
		}
	}
};
