<script>
	import ApodImage from './ApodImage.svelte';

	let { title, date, explanation, url, mediaType = 'image', copyright = '' } = $props();
</script>

<article class="apod-card">
	<div class="apod-card__meta">
		<span class="apod-card__date">{date}</span>
		{#if copyright}
			<span class="apod-card__copyright">© {copyright.trim()}</span>
		{/if}
	</div>
	<h2 class="apod-card__title">{title}</h2>
	<ApodImage src={url} {title} {mediaType} />
	<p class="apod-card__description">{explanation}</p>
</article>

<style>
	.apod-card {
		background: var(--color-deep);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-8);
		box-shadow: var(--shadow-card);
	}

	.apod-card__meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-3);
	}

	.apod-card__date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		letter-spacing: var(--tracking-mono);
	}

	.apod-card__copyright {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
	}

	.apod-card__title {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 400;
		color: var(--color-text-primary);
		line-height: var(--leading-tight);
		margin-bottom: var(--space-6);
	}

	.apod-card__description {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		line-height: var(--leading-loose);
		letter-spacing: var(--tracking-mono);
	}
</style>
