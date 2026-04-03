const BASE = 'https://api.nasa.gov/neo/rest/v1';
const KEY = import.meta.env.VITE_NASA_API_KEY ?? 'lbr8b4uUIMfVHZNh4szRsa6B67F4Z5B1L2HiP40l';

/**
 * Fetch Near Earth Objects for a given date range (max 7 days).
 * @param {string} startDate  YYYY-MM-DD
 * @param {string} [endDate]  YYYY-MM-DD — defaults to startDate (single day)
 */
export async function fetchNEOs(startDate, endDate = startDate) {
	const url = `${BASE}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${KEY}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`NASA NEO API error: ${res.status} ${res.statusText}`);
	const data = await res.json();

	// Flatten the date-keyed map into a sorted array
	const all = Object.values(data.near_earth_objects).flat();
	all.sort((a, b) => {
		const distA = parseFloat(a.close_approach_data[0]?.miss_distance?.kilometers ?? '0');
		const distB = parseFloat(b.close_approach_data[0]?.miss_distance?.kilometers ?? '0');
		return distA - distB;
	});
	return all;
}
