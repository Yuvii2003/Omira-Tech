import connectDB from '$lib/db';

export async function load({ cookies }) {
	await connectDB();
	if (cookies.get('username')) {
		return {
			cookie: cookies.get('username')
		};
	}
}
