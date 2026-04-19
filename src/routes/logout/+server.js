import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
	cookies.delete('username', { path: '/' });
	throw redirect(302, '/login');
};
