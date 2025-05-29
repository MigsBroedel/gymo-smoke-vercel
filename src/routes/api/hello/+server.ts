import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// GET /api/hello
export const GET: RequestHandler = async () => {
	return json({ message: 'Hello from the API!' });
};

// POST /api/hello
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
    console.log('Received data:', data);
	return json({ received: data });
};
