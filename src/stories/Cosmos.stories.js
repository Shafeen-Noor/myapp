// stories/CosmosObserver.stories.js
import '../lib/styles/tokens.css';

import ApodVisual from '../lib/components/Apod/ApodVisual.svelte';
import ApodHeader from '../lib/components/Apod/ApodHeader.svelte';
import ApodDatePicker from '../lib/components/Apod/ApodDatePicker.svelte';
import ApodImage from '../lib/components/Apod/ApodImage.svelte';
import ApodCard from '../lib/components/Apod/ApodCard.svelte';
import ApodView from '../lib/views/ApodView.svelte';

import NeoOrbitVisual from '../lib/components/Neo/NeoOrbitVisual.svelte';
import NeoHeader from '../lib/components/Neo/NeoHeader.svelte';
import NeoCard from '../lib/components/Neo/NeoCard.svelte';
import NeoList from '../lib/components/Neo/NeoList.svelte';
import NeoView from '../lib/views/NeoView.svelte';

// ─── Decorator ──────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Default export
export default {
	title: 'Cosmos Observer'
};

// ═════════════════════════════════════════════════════════════
// APOD Stories
// ═════════════════════════════════════════════════════════════

export const ApodVisualStory = { render: () => ({ Component: ApodVisual }) };
export const ApodHeaderStory = { render: () => ({ Component: ApodHeader }) };

export const DatePickerDefault = {
	render: () => ({
		Component: ApodDatePicker,
		props: {
			value: '',
			loading: false,
			maxDate: '2099-12-31',
			onFetch: () => console.log('Fetch clicked!')
		}
	})
};

export const DatePickerLoading = {
	render: () => ({
		Component: ApodDatePicker,
		props: {
			value: '2024-07-04',
			loading: true,
			maxDate: '2099-12-31'
		}
	})
};

export const ApodImageStory = {
	render: () => ({
		Component: ApodImage,
		props: {
			src: 'https://apod.nasa.gov/apod/image/2603/NGC3190-APOD1024.jpg',
			title: 'Interacting Galaxies NGC 3190',
			mediaType: 'image'
		}
	})
};

export const ApodCardImage = {
	render: () => ({
		Component: ApodCard,
		props: {
			title: 'Interacting Galaxies NGC 3190',
			date: '2026-03-28',
			explanation:
				'A group of four interacting galaxies, NGC 3190 is part of Hickson Compact Group 44.',
			url: 'https://apod.nasa.gov/apod/image/2603/NGC3190-APOD1024.jpg',
			mediaType: 'image',
			copyright: 'NASA / ESA'
		}
	})
};

export const ApodViewStory = { render: () => ({ Component: ApodView }) };

// ═════════════════════════════════════════════════════════════
// NEO Stories
// ═════════════════════════════════════════════════════════════

export const NeoOrbitVisualStory = { render: () => ({ Component: NeoOrbitVisual }) };
export const NeoHeaderStory = { render: () => ({ Component: NeoHeader }) };

const safeNeo = {
	id: '54321',
	name: '(2024 BX1)',
	is_potentially_hazardous_asteroid: false,
	estimated_diameter: { meters: { estimated_diameter_min: 12.5, estimated_diameter_max: 27.9 } },
	close_approach_data: [
		{
			close_approach_date: '2024-01-01',
			miss_distance: { kilometers: '384400' },
			orbiting_body: 'Earth'
		}
	]
};

export const NeoCardSafe = { render: () => ({ Component: NeoCard, props: { neo: safeNeo } }) };

export const NeoListMixed = {
	render: () => ({
		Component: NeoList,
		props: { neos: [safeNeo, { ...safeNeo, id: '99999', is_potentially_hazardous_asteroid: true }] }
	})
};

export const NeoViewStory = { render: () => ({ Component: NeoView }) };
