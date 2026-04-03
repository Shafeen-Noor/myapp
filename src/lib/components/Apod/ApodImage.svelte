<script>
	let { src, title, mediaType = 'image' } = $props();
</script>

{#if mediaType === 'image'}
	<img class="apod-media apod-media--image" {src} alt={title} />
{:else if mediaType === 'video'}
	<iframe class="apod-media apod-media--video" {src} {title} allowfullscreen></iframe>
{/if}

<style>
	.apod-media {
		width: 100%;
		border-radius: var(--radius-lg);
		display: block;
		margin-bottom: var(--space-6);
		background: var(--color-surface);
	}

	.apod-media--image {
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}

	.apod-media--video {
		height: 340px;
		border: none;
	}
</style>
