<script>
	import '../styles/ApodCard.css';
	import ApodImage from './ApodImage.svelte';

	/** @type {{ title: string, date: string, explanation: string, url: string, mediaType: 'image' | 'video' }} */
	let { title, date, explanation, url, mediaType = 'image' } = $props();
</script>

<div class="card">
	<h2 class="card__title">{title}</h2>
	<p class="card__date">{date}</p>
	<ApodImage src={url} {title} {mediaType} />
	<p class="card__description">{explanation}</p>
</div>
