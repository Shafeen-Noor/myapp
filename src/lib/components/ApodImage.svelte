<script>
	import '../styles/ApodImage.css';

	/** @type {{ src: string, title: string, mediaType: 'image' | 'video' }} */
	let { src, title, mediaType = 'image' } = $props();
</script>

{#if mediaType === 'image'}
	<img {src} alt={title} class="media" />
{:else if mediaType === 'video'}
	<iframe {src} {title} class="media video" allowfullscreen></iframe>
{/if}
