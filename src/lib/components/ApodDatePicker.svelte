<script>
	import '../styles/ApodDatePicker.css';

	/** @type {{ value: string, loading: boolean, maxDate: string, onFetch: () => void }} */
	let { value = $bindable(''), loading = false, maxDate, onFetch } = $props();
</script>

<div class="picker-row">
	<label for="date-input">Date</label>
	<input id="date-input" type="date" min="1995-06-16" max={maxDate} bind:value />
	<button onclick={onFetch} disabled={loading}>
		{loading ? 'Loading…' : 'Fetch Picture'}
	</button>
</div>
