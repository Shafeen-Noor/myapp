import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, beforeEach, expect } from 'vitest';

// ─── Mocks ───────────────────────────────────────────────────
vi.mock('$lib/api/Apod.js', () => ({
	fetchAPOD: vi.fn()
}));
import { fetchAPOD } from '$lib/api/Apod.js';

// ─── Components ──────────────────────────────────────────────
import ApodHeader from '$lib/components/Apod/ApodHeader.svelte';
import ApodVisual from '$lib/components/Apod/ApodVisual.svelte';
import ApodDatePicker from '$lib/components/Apod/ApodDatePicker.svelte';
import ApodImage from '$lib/components/Apod/ApodImage.svelte';
import ApodCard from '$lib/components/Apod/ApodCard.svelte';
import ApodView from '$lib/views/ApodView.svelte';

// ─── Fixtures ────────────────────────────────────────────────
const mockApod = {
	title: 'A Galaxy Far Away',
	date: '2024-01-01',
	explanation: 'A beautiful galaxy photographed by Hubble.',
	url: 'https://example.com/galaxy.jpg',
	media_type: 'image',
	copyright: 'NASA'
};

beforeEach(() => vi.clearAllMocks());

// ─────────────────────────────────────────────────────────────
// ApodVisual
describe('ApodVisual', () => {
	it('renders the visual container', () => {
		render(ApodVisual);
		expect(document.querySelector('.apod-header__visual')).toBeInTheDocument();
	});

	it('renders three orbiting asteroid elements', () => {
		render(ApodVisual);
		const asteroids = document.querySelectorAll('.asteroid');
		expect(asteroids).toHaveLength(3);
	});
});

// ─────────────────────────────────────────────────────────────
// ApodHeader
describe('ApodHeader', () => {
	it('renders the eyebrow text', () => {
		render(ApodHeader);
		expect(screen.getByText('NASA · Astronomy Picture of the Day')).toBeInTheDocument();
	});

	it('renders the main heading', () => {
		render(ApodHeader);
		expect(screen.getByRole('heading', { name: 'Explore the Cosmos' })).toBeInTheDocument();
	});

	it('renders the subtitle', () => {
		render(ApodHeader);
		expect(screen.getByText('Discover the wonders of the universe')).toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────────────
// ApodDatePicker
describe('ApodDatePicker', () => {
	const defaultProps = { value: '', loading: false, maxDate: '2099-12-31' };

	it('renders the label "Transmission Date"', () => {
		render(ApodDatePicker, { props: defaultProps });
		expect(screen.getByLabelText('Transmission Date')).toBeInTheDocument();
	});

	it('renders the "Receive Signal" button', () => {
		render(ApodDatePicker, { props: defaultProps });
		expect(screen.getByRole('button', { name: 'Receive Signal' })).toBeInTheDocument();
	});

	it('sets min and max attributes', () => {
		render(ApodDatePicker, { props: { ...defaultProps, maxDate: '2030-06-01' } });
		const input = screen.getByLabelText('Transmission Date');
		expect(input).toHaveAttribute('min', '1995-06-16');
		expect(input).toHaveAttribute('max', '2030-06-01');
	});

	it('reflects value in the input', () => {
		render(ApodDatePicker, { props: { ...defaultProps, value: '2024-07-04' } });
		expect(screen.getByLabelText('Transmission Date')).toHaveValue('2024-07-04');
	});

	it('updates the bound value when input changes', async () => {
		const { getByLabelText } = render(ApodDatePicker, {
			value: '2024-01-01',
			maxDate: '2099-12-31',
			loading: false
		});

		const input = getByLabelText('Transmission Date');

		// simulate user changing the input
		await fireEvent.input(input, { target: { value: '2024-03-15' } });

		// just check the DOM value
		expect(input.value).toBe('2024-03-15');
	});

	it('calls fetch when button clicked', async () => {
		let fetchCalled = false;
		const handleFetch = () => (fetchCalled = true);

		const { getByRole } = render(ApodDatePicker, {
			value: '',
			loading: false,
			maxDate: '2099-12-31',
			onFetch: handleFetch
		});

		const button = getByRole('button', { name: /Receive Signal/i });
		await fireEvent.click(button);

		expect(fetchCalled).toBe(true);
	});

	it('disables button when loading', () => {
		render(ApodDatePicker, { props: { ...defaultProps, loading: true } });
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('shows spinner when loading', () => {
		render(ApodDatePicker, { props: { ...defaultProps, loading: true } });
		expect(screen.queryByText('Receive Signal')).not.toBeInTheDocument();
		expect(document.querySelector('.picker__btn-spinner')).toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────────────
// ApodImage
describe('ApodImage', () => {
	it('renders img for image type', () => {
		render(ApodImage, {
			props: { src: 'https://example.com/img.jpg', title: 'Galaxy', mediaType: 'image' }
		});
		const img = screen.getByRole('img', { name: 'Galaxy' });
		expect(img).toBeInTheDocument();
	});

	it('renders iframe for video type', () => {
		render(ApodImage, {
			props: { src: 'https://youtube.com/embed/abc', title: 'Solar Flare', mediaType: 'video' }
		});
		const iframe = document.querySelector('iframe');
		expect(iframe).toBeInTheDocument();
	});

	it('defaults to image if mediaType not provided', () => {
		render(ApodImage, { props: { src: 'https://example.com/img.jpg', title: 'Galaxy' } });
		expect(screen.getByRole('img')).toBeInTheDocument();
		expect(document.querySelector('iframe')).not.toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────────────
// ApodCard
describe('ApodCard', () => {
	const baseProps = {
		title: 'Pillars of Creation',
		date: '2024-03-01',
		explanation: 'Famous Hubble image.',
		url: 'https://example.com/pillars.jpg',
		mediaType: 'image',
		copyright: 'NASA / ESA'
	};

	it('renders title, date, explanation', () => {
		render(ApodCard, { props: baseProps });
		expect(screen.getByRole('heading', { name: 'Pillars of Creation' })).toBeInTheDocument();
		expect(screen.getByText('2024-03-01')).toBeInTheDocument();
		expect(screen.getByText('Famous Hubble image.')).toBeInTheDocument();
	});

	it('renders copyright if provided', () => {
		render(ApodCard, { props: baseProps });
		expect(screen.getByText(/© NASA \/ ESA/)).toBeInTheDocument();
	});

	it('does not render copyright if empty', () => {
		render(ApodCard, { props: { ...baseProps, copyright: '' } });
		expect(screen.queryByText(/©/)).not.toBeInTheDocument();
	});

	it('renders img or iframe depending on mediaType', () => {
		render(ApodCard, { props: baseProps });
		expect(screen.getByRole('img')).toBeInTheDocument();

		render(ApodCard, {
			props: { ...baseProps, url: 'https://youtube.com/embed/abc', mediaType: 'video' }
		});
		expect(document.querySelector('iframe')).toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────────────
// ApodView
describe('ApodView', () => {
	it('fetches today on mount and shows header, picker, and button', async () => {
		fetchAPOD.mockResolvedValue(mockApod);
		render(ApodView);
		expect(screen.getByText('NASA · Astronomy Picture of the Day')).toBeInTheDocument();
		expect(screen.getByLabelText('Transmission Date')).toBeInTheDocument();
		await waitFor(() =>
			expect(screen.getByRole('button', { name: 'Receive Signal' })).toBeInTheDocument()
		);
	});

	it("calls fetchAPOD with today's date on mount", async () => {
		fetchAPOD.mockResolvedValue(mockApod);
		render(ApodView);
		const today = new Date().toISOString().split('T')[0];
		await waitFor(() => expect(fetchAPOD).toHaveBeenCalledWith(today));
	});

	it('shows loading and disables button', async () => {
		fetchAPOD.mockReturnValue(new Promise(() => {}));
		render(ApodView);
		await waitFor(() => expect(screen.getByText(/Contacting NASA/)).toBeInTheDocument());
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('renders card after fetch', async () => {
		fetchAPOD.mockResolvedValue(mockApod);
		render(ApodView);
		await waitFor(() => {
			expect(screen.getByText('A Galaxy Far Away')).toBeInTheDocument();
			expect(screen.getByText('A beautiful galaxy photographed by Hubble.')).toBeInTheDocument();
			expect(screen.getByRole('img', { name: 'A Galaxy Far Away' })).toBeInTheDocument();
		});
	});

	it('shows error if fetch fails', async () => {
		fetchAPOD.mockRejectedValue(new Error('NASA is down'));
		render(ApodView);
		await waitFor(() => expect(screen.getByText(/NASA is down/i)).toBeInTheDocument());
	});
});
