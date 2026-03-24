<script>
	import { fetchAPOD } from '../api/apod.js';

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
	<div class="picker-row">
		<label for="date-input">Date</label>
		<input id="date-input" type="date" min="1995-06-16" max={today} bind:value={selectedDate} />
		<button onclick={handleFetch} disabled={loading}>
			{loading ? 'Loading…' : 'Fetch Picture'}
		</button>
	</div>

	{#if error}
		<p class="msg error">{error}</p>
	{/if}

	{#if loading}
		<p class="msg loading">Contacting NASA… 🛸</p>
	{/if}

	{#if apodData}
		<div class="card">
			<h2>{apodData.title}</h2>
			<p class="date-label">{apodData.date}</p>

			{#if apodData.media_type === 'image'}
				<img src={apodData.url} alt={apodData.title} class="media" />
			{:else if apodData.media_type === 'video'}
				<iframe src={apodData.url} title={apodData.title} class="media video" allowfullscreen
				></iframe>
			{/if}

			<p class="description">{apodData.explanation}</p>
		</div>
	{/if}
</div>

<style>
	.apod-fetcher {
		font-family: Georgia, serif;
		max-width: 680px;
		margin: 0 auto;
		color: #e8e8f0;
	}
	.picker-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	label {
		color: #aaa;
		font-size: 0.95rem;
	}

	input[type='date'] {
		padding: 0.45rem 0.75rem;
		border: 1px solid #08081d;
		border-radius: 6px;
		background: #c8b8ff;
		color: #272777;
		font-size: 0.95rem;
	}

	button {
		padding: 0.45rem 1.1rem;
		border: none;
		border-radius: 6px;
		background: #6a4fcf;
		color: #fff;
		font-size: 0.95rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	button:hover {
		background: #8b6fe8;
	}

	.msg {
		padding: 0.6rem 1rem;
		border-radius: 6px;
		margin-bottom: 1rem;
	}
	.error {
		color: #ff6b6b;
		background: #2a1010;
		border-left: 3px solid #ff6b6b;
	}
	.loading {
		color: #888;
		font-style: italic;
	}

	.card {
		background: #12122a;
		border: 1px solid #2a2a4a;
		border-radius: 12px;
		padding: 1.5rem;
	}
	.card h2 {
		margin-top: 0;
		color: #c8b8ff;
		font-size: 1.35rem;
	}
	.date-label {
		color: #888;
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.media {
		width: 100%;
		border-radius: 8px;
		display: block;
		margin-bottom: 1rem;
	}
	.video {
		height: 340px;
		border: none;
	}

	.description {
		color: #b0b0c8;
		line-height: 1.7;
		font-size: 0.93rem;
		margin-bottom: 0;
	}
</style>
