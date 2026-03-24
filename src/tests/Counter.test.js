import { render, fireEvent } from '@testing-library/svelte';
import { describe, test } from 'vitest';
import Counter from '../lib/components/Counter.svelte';

describe('Counter.svelte', () => {
	test('renders initial count', () => {
		const { getByText } = render(Counter);
		getByText('Clicked 0 times');
	});

	test('increments once', async () => {
		const { getByText } = render(Counter);
		const button = getByText('Clicked 0 times');
		await fireEvent.click(button);
		getByText('Clicked 1 time');
	});

	test('increments multiple times', async () => {
		const { getByText } = render(Counter);
		const button = getByText('Clicked 0 times');
		await fireEvent.click(button);
		await fireEvent.click(button);
		await fireEvent.click(button);
		getByText('Clicked 3 times');
	});
});
