<script>
	import { onMount } from 'svelte';

	import { fetchNEOs } from '$lib/api/Neo.js';
	import NeoHeader from '$lib/components/Neo/NeoHeader.svelte';
	import NeoList from '$lib/components/Neo/NeoList.svelte';
	import ApodDatePicker from '$lib/components/Apod/ApodDatePicker.svelte';

	const today = new Date().toISOString().split('T')[0];

	let selectedDate = $state(today);
	let neos = $state([]);
	let loading = $state(false);
	let error = $state('');

	const isFuture = $derived(new Date(selectedDate) > new Date());

	async function loadNEOs() {
		loading = true;
		error = '';
		neos = [];
		try {
			neos = await fetchNEOs(selectedDate);
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadNEOs();
	});
</script>

<div class="neo-view">
	<NeoHeader />

	<ApodDatePicker bind:value={selectedDate} {loading} maxDate="2100-12-31" onFetch={loadNEOs} />

	{#if isFuture}
		<p class="status status--info">
			Showing predicted asteroid positions for {selectedDate}
		</p>
	{/if}

	{#if error}
		<p class="status status--error" role="alert"><span>⚠</span> {error}</p>
	{/if}

	{#if loading}
		<div class="neo-loading" aria-live="polite">
			<div class="neo-loading__dots">
				<span></span><span></span><span></span>
			</div>
			<p>Scanning near-Earth space…</p>
		</div>
	{:else}
		<NeoList {neos} />
	{/if}
</div>

<style>
	.neo-view {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: var(--space-8) var(--space-6);
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
		color: var(--color-danger);
		background: var(--color-danger-dim);
		border-left: 2px solid var(--color-danger);
	}

	.status--info {
		color: var(--color-text-secondary-accent);
		background: var(--color-secondary-dim);
		border-left: 2px solid var(--color-secondary);
	}

	.neo-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-12) 0;
		color: var(--color-text-secondary);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.neo-loading__dots {
		display: flex;
		gap: var(--space-2);
	}

	.neo-loading__dots span {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		animation: bounce 1.2s ease-in-out infinite;
	}

	.neo-loading__dots span:nth-child(2) {
		animation-delay: 0.2s;
	}
	.neo-loading__dots span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0.6);
			opacity: 0.4;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
