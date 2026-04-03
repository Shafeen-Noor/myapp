<script>
	import NeoCard from './NeoCard.svelte';

	let { neos = [] } = $props();

	const hazardousCount = $derived(neos.filter((n) => n.is_potentially_hazardous_asteroid).length);
</script>

{#if neos.length > 0}
	<div class="neo-list">
		<p class="neo-list__count">
			{neos.length} object{neos.length !== 1 ? 's' : ''} detected —
			<span class="neo-list__hazardous">{hazardousCount} potentially hazardous</span>
		</p>
		{#each neos as neo (neo.id)}
			<NeoCard {neo} />
		{/each}
	</div>
{/if}

<style>
	.neo-list__count {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin-bottom: var(--space-6);
		font-family: var(--font-mono);
		letter-spacing: var(--tracking-mono);
	}

	.neo-list__hazardous {
		color: var(--color-red);
	}
</style>
