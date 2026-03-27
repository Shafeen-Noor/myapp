<script>
	import { fetchAPOD } from '../api/apod.js';
	import '../styles/ApodFetcher.css';
	import ApodHeader from './ApodHeader.svelte';
	import ApodDatePicker from './ApodDatePicker.svelte';
	import ApodCard from './ApodCard.svelte';

	let selectedDate = $state('');
	let apodData = $state(null);
	let loading = $state(false);
	let error = $state('');

	const today = new Date().toISOString().split('T')[0];

	async function handleFetch() {
		if (!selectedDate) {
			error = 'Please pick a date first!';
			return;
		}

		loading = true;
		error = '';
		apodData = null;

		try {
			apodData = await fetchAPOD(selectedDate);
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
</script>

<div class="apod-fetcher">
	<ApodHeader />

	<ApodDatePicker bind:value={selectedDate} {loading} maxDate={today} onFetch={handleFetch} />

	{#if error}
		<p class="msg msg--error">{error}</p>
	{/if}

	{#if loading}
		<p class="msg msg--loading">Contacting NASA… 🛸</p>
	{/if}

	{#if apodData}
		<ApodCard
			title={apodData.title}
			date={apodData.date}
			explanation={apodData.explanation}
			url={apodData.url}
			mediaType={apodData.media_type}
		/>
	{/if}
</div>
