<script>
	import ApodVisual from './ApodVisual.svelte';
</script>

<header class="apod-header">
	<ApodVisual />
	<div class="apod-header__titles">
		<p class="apod-header__eyebrow">NASA · Astronomy Picture of the Day</p>
		<h1 class="apod-header__title">Explore the Cosmos</h1>
		<p class="apod-header__subtitle">Discover the wonders of the universe</p>
	</div>
</header>

<style>
	.apod-header {
		display: flex;
		align-items: center;
		gap: var(--space-6);
		margin-bottom: var(--space-8);
		position: relative;
	}

	.apod-header__titles {
		display: flex;
		flex-direction: column;
		z-index: 1;
	}

	.apod-header__eyebrow {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		color: var(--color-text-primary-accent);
		margin-bottom: var(--space-2);
	}

	.apod-header__title {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 300;
		color: var(--color-text-primary);
		line-height: var(--leading-tight);
		margin-bottom: var(--space-2);
	}

	.apod-header__subtitle {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}
</style>
