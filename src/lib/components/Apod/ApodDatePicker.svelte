<script>
	/** @type {{ value: string, loading: boolean, maxDate: string, onFetch: () => void }} */
	let { value = $bindable(''), loading = false, maxDate, onFetch } = $props();
</script>

<div class="picker">
	<label class="picker__label" for="date-input">Transmission Date</label>
	<div class="picker__row">
		<input
			id="date-input"
			class="picker__input"
			type="date"
			min="1995-06-16"
			max={maxDate}
			bind:value
		/>
		<button class="picker__btn" onclick={() => onFetch && onFetch()} disabled={loading}>
			{#if loading}
				<span class="picker__btn-spinner">◌</span>
			{:else}
				<span>Receive Signal</span>
			{/if}
		</button>
	</div>
</div>

<style>
	.picker {
		margin-bottom: var(--space-6);
	}

	.picker__label {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		color: var(--color-text-tertiary);
		margin-bottom: var(--space-2);
	}

	.picker__row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.picker__input {
		padding: var(--space-3) var(--space-4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-text-primary-accent);
		font-family: var(--font-mono);
		font-size: var(--text-base);
		letter-spacing: var(--tracking-mono);
		transition: border-color var(--duration-base) var(--ease-out);
		color-scheme: dark;
	}

	.picker__input:focus {
		outline: none;
		border-color: var(--color-primary-dim);
		box-shadow: var(--glow-primary);
	}

	.picker__btn {
		padding: var(--space-3) var(--space-6);
		border: 1px solid var(--color-primary-dim);
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-text-primary-accent);
		font-family: var(--font-mono);
		font-size: var(--text-base);
		letter-spacing: var(--tracking-mono);
		cursor: pointer;
		transition:
			background var(--duration-base) var(--ease-out),
			border-color var(--duration-base) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);
	}

	.picker__btn:hover:not(:disabled) {
		background: var(--color-primary-dim);
		border-color: var(--color-primary);
		box-shadow: var(--glow-primary);
	}

	.picker__btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.picker__btn-spinner {
		display: inline-block;
		animation: spin 1.5s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
