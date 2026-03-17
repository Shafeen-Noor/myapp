<script>
	let count = $state(0);

	function increment() {
		count = count + 1;
	}
</script>

<div class="container">
	<h1>Svelte + JavaScript Counter</h1>

	<button onclick={increment}>
		Clicked {count}
		{count === 1 ? 'time' : 'times'}
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-family: sans-serif;
		background-color: #f9f9f9;
	}

	h1 {
		margin-bottom: 2rem;
		color: #333;
	}

	button {
		padding: 0.8rem 1.5rem;
		font-size: 1.2rem;
		border: none;
		border-radius: 8px;
		background-color: #4f46e5;
		color: white;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #4338ca;
	}
</style>