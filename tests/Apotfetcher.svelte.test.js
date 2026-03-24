import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ApodFetcher from '../src/lib/components/ApodFetcher.svelte';

vi.mock('../src/lib/api/apod.js', () => ({
	fetchAPOD: vi.fn()
}));

import { fetchAPOD } from '../src/lib/api/apod.js';

const mockData = {
	title: 'A Galaxy Far Away',
	date: '2024-01-01',
	explanation: 'A beautiful galaxy.',
	url: 'https://example.com/galaxy.jpg',
	media_type: 'image'
};

beforeEach(() => {
	vi.clearAllMocks();
});

describe('ApodFetcher', () => {
	it('shows error if no date is selected', async () => {
		render(ApodFetcher);

		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getByText(/please pick a date first/i)).toBeInTheDocument();
		});
	});

	it('calls fetchAPOD with the correct date', async () => {
		fetchAPOD.mockResolvedValue(mockData);
		render(ApodFetcher);

		const input = screen.getByLabelText(/date/i);
		input.value = '2024-01-01';
		fireEvent.input(input);
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(fetchAPOD).toHaveBeenCalledWith('2024-01-01');
		});
	});

	it('shows loading state while fetching', async () => {
		fetchAPOD.mockReturnValue(new Promise(() => {}));
		render(ApodFetcher);

		const input = screen.getByLabelText(/date/i);
		input.value = '2024-01-01';
		fireEvent.input(input);
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getByText(/contacting nasa/i)).toBeInTheDocument();
		});
	});

	it('renders the card when data comes back', async () => {
		fetchAPOD.mockResolvedValue(mockData);
		render(ApodFetcher);

		const input = screen.getByLabelText(/date/i);
		input.value = '2024-01-01';
		fireEvent.input(input);
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getByText('A Galaxy Far Away')).toBeInTheDocument();
			expect(screen.getByRole('img')).toBeInTheDocument();
		});
	});

	it('shows error if fetch fails', async () => {
		fetchAPOD.mockRejectedValue(new Error('NASA is down'));
		render(ApodFetcher);

		const input = screen.getByLabelText(/date/i);
		input.value = '2024-01-01';
		fireEvent.input(input);
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(screen.getByText(/nasa is down/i)).toBeInTheDocument();
		});
	});
});
