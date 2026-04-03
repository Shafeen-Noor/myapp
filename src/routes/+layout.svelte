<script>
	let { children } = $props();
	import '$lib/styles/tokens.css';
</script>

<svelte:head></svelte:head>

{@render children()}
