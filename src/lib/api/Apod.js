const NASA_API_KEY = 'lbr8b4uUIMfVHZNh4szRsa6B67F4Z5B1L2HiP40l';
const APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchAPOD(date) {
	const url = `${APOD_BASE_URL}?api_key=${NASA_API_KEY}&date=${date}`;

	const response = await fetch(url);

	if (!response.ok) {
		const err = await response.json();
		throw new Error(err.msg || 'Failed to fetch from NASA');
	}

	return await response.json();
}
