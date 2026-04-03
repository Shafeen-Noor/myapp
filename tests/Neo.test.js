import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// ─── Mocks ─────────────────────────────────────────────
vi.mock('$lib/api/Neo.js', () => ({
	fetchNEOs: vi.fn()
}));
import { fetchNEOs } from '$lib/api/Neo.js';

// ─── Components ────────────────────────────────────────
import NeoOrbitVisual from '$lib/components/Neo/NeoOrbitVisual.svelte';
import NeoHeader from '$lib/components/Neo/NeoHeader.svelte';
import NeoCard from '$lib/components/Neo/NeoCard.svelte';
import NeoList from '$lib/components/Neo/NeoList.svelte';
import NeoView from '$lib/views/NeoView.svelte';

// ─── Fixtures ─────────────────────────────────────────
const makeMockNeo = (overrides = {}) => ({
	id: '54321',
	name: '(2024 BX1)',
	is_potentially_hazardous_asteroid: false,
	estimated_diameter: { meters: { estimated_diameter_min: 12.5, estimated_diameter_max: 27.9 } },
	close_approach_data: [
		{
			close_approach_date: '2024-01-01',
			close_approach_date_full: '2024-Jan-01 14:32',
			miss_distance: { kilometers: '384400', lunar: '1.00' },
			relative_velocity: { kilometers_per_hour: '54000' },
			orbiting_body: 'Earth'
		}
	],
	...overrides
});

const safeNeo = makeMockNeo();
const hazardousNeo = makeMockNeo({
	id: '99999',
	name: '(1999 AN10)',
	is_potentially_hazardous_asteroid: true
});
const mockNeoList = [safeNeo, hazardousNeo];

beforeEach(() => vi.clearAllMocks());

// ─────────────────────────────────────────────────────
// NeoOrbitVisual
// ─────────────────────────────────────────────────────
describe('NeoOrbitVisual', () => {
	it('renders the orbit visual container', () => {
		render(NeoOrbitVisual);
		expect(document.querySelector('.neo-orbit-visual')).toBeInTheDocument();
	});

	it('renders three orbit rings', () => {
		render(NeoOrbitVisual);
		expect(document.querySelectorAll('.orbit')).toHaveLength(3);
	});

	it('renders the earth symbol', () => {
		render(NeoOrbitVisual);
		expect(screen.getByText('⊕')).toBeInTheDocument();
	});

	it('renders three asteroids — one per orbit', () => {
		render(NeoOrbitVisual);
		expect(document.querySelectorAll('.asteroid')).toHaveLength(3);
	});
});

// ─────────────────────────────────────────────────────
// NeoHeader
// ─────────────────────────────────────────────────────
describe('NeoHeader', () => {
	it('renders the eyebrow text', () => {
		render(NeoHeader);
		expect(screen.getByText('NASA · Near Earth Objects')).toBeInTheDocument();
	});

	it('renders the main heading', () => {
		render(NeoHeader);
		expect(screen.getByRole('heading', { name: 'Asteroid Watch' })).toBeInTheDocument();
	});

	it('renders the subtitle', () => {
		render(NeoHeader);
		expect(screen.getByText('Objects approaching Earth')).toBeInTheDocument();
	});

	it('renders the orbit visual', () => {
		render(NeoHeader);
		expect(document.querySelector('.neo-orbit-visual')).toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────
// NeoCard
// ─────────────────────────────────────────────────────
describe('NeoCard', () => {
	it('renders the asteroid name without parentheses', () => {
		render(NeoCard, { props: { neo: safeNeo } });
		expect(screen.getByText('2024 BX1')).toBeInTheDocument();
	});

	it('renders the distance in km and lunar units', () => {
		render(NeoCard, { props: { neo: safeNeo } });
		expect(screen.getByText(/384,400 km away/)).toBeInTheDocument();
		expect(screen.getByText(/1\.00 lunar/)).toBeInTheDocument();
	});

	it('shows the SAFE badge for non-hazardous asteroids', () => {
		render(NeoCard, { props: { neo: safeNeo } });
		expect(screen.getByText('✓ SAFE')).toBeInTheDocument();
	});

	it('shows the HAZARDOUS badge for potentially hazardous asteroids', () => {
		render(NeoCard, { props: { neo: hazardousNeo } });
		expect(screen.getByText('⚠ HAZARDOUS')).toBeInTheDocument();
	});

	it('applies the hazardous modifier class for dangerous asteroids', () => {
		render(NeoCard, { props: { neo: hazardousNeo } });
		expect(document.querySelector('.neo-card--hazardous')).toBeInTheDocument();
	});

	it('does not apply the hazardous modifier class for safe asteroids', () => {
		render(NeoCard, { props: { neo: safeNeo } });
		expect(document.querySelector('.neo-card--hazardous')).not.toBeInTheDocument();
	});

	it('details panel is hidden by default', () => {
		render(NeoCard, { props: { neo: safeNeo } });
		expect(document.querySelector('.neo-card__details')).not.toBeInTheDocument();
	});

	it('expands details panel when the trigger is clicked', async () => {
		render(NeoCard, { props: { neo: safeNeo } });
		await fireEvent.click(screen.getByRole('button'));
		await waitFor(() => expect(document.querySelector('.neo-card__details')).toBeInTheDocument());
	});

	it('sets aria-expanded to true when expanded', async () => {
		render(NeoCard, { props: { neo: safeNeo } });
		const trigger = screen.getByRole('button');
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await fireEvent.click(trigger);
		await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
	});

	it('collapses details panel on second click', async () => {
		render(NeoCard, { props: { neo: safeNeo } });
		const trigger = screen.getByRole('button');
		await fireEvent.click(trigger);
		await waitFor(() => expect(document.querySelector('.neo-card__details')).toBeInTheDocument());
		await fireEvent.click(trigger);
		await waitFor(() =>
			expect(document.querySelector('.neo-card__details')).not.toBeInTheDocument()
		);
	});

	it('shows velocity, diameter, close approach, orbiting body, and JPL link', async () => {
		render(NeoCard, { props: { neo: safeNeo } });
		await fireEvent.click(screen.getByRole('button'));
		await waitFor(() => {
			expect(
				screen.getByText('Velocity', { selector: '.neo-card__stat-label' })
			).toBeInTheDocument();
			expect(screen.getByText(/54,000/)).toBeInTheDocument();
			expect(
				screen.getByText('Diameter', { selector: '.neo-card__stat-label' })
			).toBeInTheDocument();
			expect(screen.getByText(/13–28/)).toBeInTheDocument();
			expect(screen.getByText('2024-Jan-01 14:32')).toBeInTheDocument();
			expect(screen.getByText('Earth')).toBeInTheDocument();
			const link = screen.getByRole('link', { name: /JPL Database/i });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('54321'));
			expect(link).toHaveAttribute('target', '_blank');
		});
	});
});

// ─────────────────────────────────────────────────────
// NeoList
// ─────────────────────────────────────────────────────
describe('NeoList', () => {
	it('renders object count and hazardous count', () => {
		render(NeoList, { props: { neos: mockNeoList } });
		expect(screen.getByText(/2 objects detected/)).toBeInTheDocument();
		expect(screen.getByText(/1 potentially hazardous/)).toBeInTheDocument();
	});

	it('renders a NeoCard for each NEO', () => {
		render(NeoList, { props: { neos: mockNeoList } });
		expect(document.querySelectorAll('.neo-card')).toHaveLength(2);
	});

	it('renders nothing when the list is empty', () => {
		render(NeoList, { props: { neos: [] } });
		expect(document.querySelector('.neo-list')).not.toBeInTheDocument();
	});
});

// ─────────────────────────────────────────────────────
// NeoView
// ─────────────────────────────────────────────────────
describe('NeoView', () => {
	it("fetches today's NEOs on mount", async () => {
		fetchNEOs.mockResolvedValue(mockNeoList);
		render(NeoView);
		const today = new Date().toISOString().split('T')[0];
		await waitFor(() => expect(fetchNEOs).toHaveBeenCalledWith(today));
	});

	it('shows loading, error, and predicted banner correctly', async () => {
		fetchNEOs.mockRejectedValue(new Error('NEO API error'));
		render(NeoView);

		// Check loading indicator
		await waitFor(() => expect(screen.getByText(/scanning near-earth space/i)).toBeInTheDocument());

		// Check error
		await waitFor(() => expect(screen.getByText(/neo api error/i)).toBeInTheDocument());

		// Future date
		const futureDate = '2099-01-01';
		await fireEvent.input(screen.getByLabelText('Transmission Date'), {
			target: { value: futureDate }
		});
		await fireEvent.click(screen.getByRole('button', { name: 'Receive Signal' }));
		await waitFor(() =>
			expect(
				screen.getByText(`Showing predicted asteroid positions for ${futureDate}`)
			).toBeInTheDocument()
		);
	});

	it('re-fetches when a new date is selected', async () => {
		fetchNEOs.mockResolvedValue(mockNeoList);
		render(NeoView);
		await fireEvent.input(screen.getByLabelText('Transmission Date'), {
			target: { value: '2025-06-15' }
		});
		await fireEvent.click(screen.getByRole('button', { name: 'Receive Signal' }));
		await waitFor(() => expect(fetchNEOs).toHaveBeenLastCalledWith('2025-06-15'));
	});
});
