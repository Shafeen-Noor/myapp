<script>
	import { onMount } from 'svelte';
	import { fetchAPOD } from '$lib/api/Apod.js';
	import ApodHeader from '../components/Apod/ApodHeader.svelte';
	import ApodDatePicker from '../components/Apod/ApodDatePicker.svelte';
	import ApodCard from '../components/Apod/ApodCard.svelte';

	const today = new Date().toISOString().split('T')[0];

	let selectedDate = $state(today);
	let apodData = $state(null);
	let loading = $state(false);
	let error = $state('');

	onMount(() => handleFetch());

	async function handleFetch() {
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

<div class="apod-view">
	<ApodHeader />

	<ApodDatePicker bind:value={selectedDate} {loading} maxDate={today} onFetch={handleFetch} />

	{#if error}
		<p class="status status--error" role="alert">
			<span class="status__icon">⚠</span>
			{error}
		</p>
	{/if}

	{#if loading}
		<p class="status status--loading" aria-live="polite">
			<span class="status__icon status__icon--spin">◌</span> Contacting NASA deep space network…
		</p>
	{/if}

	{#if apodData}
		<div class="fade-up">
			<ApodCard
				title={apodData.title}
				date={apodData.date}
				explanation={apodData.explanation}
				url={apodData.url}
				mediaType={apodData.media_type}
				copyright={apodData.copyright}
			/>
		</div>
	{/if}
</div>

<style>
	.apod-view {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-8) var(--space-6);
		animation: fadeUp var(--duration-slow) var(--ease-out) both;
	}

	.status {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-5);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-6);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: var(--tracking-mono);
	}

	.status--error {
		color: var(--color-red);
		background: var(--color-red-dim);
		border-left: 2px solid var(--color-red);
	}

	.status--loading {
		color: var(--color-text-secondary-accent);
		background: var(--color-secondary-dim);
		border-left: 2px solid var(--color-secondary);
	}

	.status__icon {
		font-size: var(--text-md);
	}

	.status__icon--spin {
		display: inline-block;
		animation: spin 1.5s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.fade-up {
		animation: fadeUp var(--duration-slow) var(--ease-out) both;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(var(--space-6));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
