<script>
	import ApodView from '$lib/views/ApodView.svelte';
	import NeoView from '$lib/views/NeoView.svelte';

	let currentView = $state('apod');

	const isApod = $derived(currentView === 'apod');
	const isNeo = $derived(currentView === 'neo');

	const now = new Date().toUTCString().slice(0, 16);
</script>

<div class="shell">
	<header class="observatory-bar">
		<span class="observatory-bar__logo">✦ COSMOS OBSERVER</span>
		<span class="observatory-bar__date">{now} UTC</span>
	</header>

	<main class="shell__content">
		{#if isApod}
			<ApodView />
		{/if}

		{#if isNeo}
			<NeoView />
		{/if}
	</main>

	<!-- svelte-ignore a11y_no_redundant_roles -->
	<nav class="bottom-nav" role="navigation" aria-label="Main navigation">
		<button
			class="bottom-nav__item"
			class:bottom-nav__item--active={isApod}
			onclick={() => (currentView = 'apod')}
			aria-current={isApod ? 'page' : undefined}
		>
			<span class="bottom-nav__icon">◈</span>
			<span class="bottom-nav__label">Picture of the Day</span>
		</button>

		<button
			class="bottom-nav__item"
			class:bottom-nav__item--active={isNeo}
			onclick={() => (currentView = 'neo')}
			aria-current={isNeo ? 'page' : undefined}
		>
			<span class="bottom-nav__icon">◎</span>
			<span class="bottom-nav__label">Asteroid Watch</span>
		</button>
	</nav>
</div>

<style>
	.shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.observatory-bar {
		position: sticky;
		top: 0;
		z-index: var(--z-nav);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-3) var(--space-6);
		background: rgba(2, 2, 10, 0.85);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
	}

	.observatory-bar__logo {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 700;
		letter-spacing: var(--tracking-wider);
		color: var(--color-text-primary-accent);
	}

	.observatory-bar__date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		letter-spacing: var(--tracking-mono);
	}

	.shell__content {
		flex: 1;
		padding-bottom: var(--nav-height);
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: var(--z-nav);
		display: flex;
		height: var(--nav-height);
		background: rgba(2, 2, 10, 0.92);
		backdrop-filter: blur(16px);
		border-top: 1px solid var(--color-border);
	}

	.bottom-nav__item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-tertiary);
		transition: color var(--duration-base) var(--ease-out);
		padding: var(--space-2);
	}

	.bottom-nav__item:hover {
		color: var(--color-text-secondary);
	}

	.bottom-nav__item--active {
		color: var(--color-text-primary-accent);
	}

	.bottom-nav__item--active .bottom-nav__icon {
		text-shadow: var(--glow-primary);
	}

	.bottom-nav__icon {
		font-size: var(--text-lg);
		line-height: 1;
	}

	.bottom-nav__label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
	}
</style>
