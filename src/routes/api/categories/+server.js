let categories = [
	{ category: 'TV', img: './images/tv.webp' },
	{ category: 'Audio', img: './images/audio.webp' },
	{ category: 'Laptop', img: './images/laptop.webp' },
	{ category: 'Mobile', img: './images/mobile.webp' },
	{ category: 'Gaming', img: './images/gaming.webp' },
	{ category: 'Appliances', img: './images/appliances.webp' }
];

export async function GET() {
	return new Response(JSON.stringify({ categories }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
