<script>
	import ApodFetcher from '../lib/components/ApodFetcher.svelte';
</script>

<main>
	<ApodFetcher />
</main>

<style>
	:global(body) {
		margin: 0;
		background: #0a0a1a;
	}

	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 2.5rem 1.25rem;
	}
</style>
