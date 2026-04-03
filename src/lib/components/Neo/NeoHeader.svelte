<script>
	import NeoOrbitVisual from './NeoOrbitVisual.svelte';
</script>

<header class="neo-header">
	<NeoOrbitVisual />
	<div class="neo-header__titles">
		<p class="neo-header__eyebrow">NASA · Near Earth Objects</p>
		<h1 class="neo-header__title">Asteroid Watch</h1>
		<p class="neo-header__subtitle">Objects approaching Earth</p>
	</div>
</header>

<style>
	.neo-header {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		margin-bottom: var(--space-10);
	}

	.neo-header__titles {
		display: flex;
		flex-direction: column;
	}

	.neo-header__eyebrow {
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		color: var(--color-secondary);
		margin-bottom: var(--space-2);
		font-family: var(--font-mono);
	}

	.neo-header__title {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 300;
		color: var(--color-text-primary);
		line-height: var(--leading-tight);
		margin-bottom: var(--space-2);
	}

	.neo-header__subtitle {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		font-family: var(--font-mono);
	}
</style>
