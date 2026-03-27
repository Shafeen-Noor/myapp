// ApodComponents.stories.js
import ApodHeader from '../lib/components/ApodHeader.svelte';
import ApodDatePicker from '../lib/components/ApodDatePicker.svelte';
import ApodImage from '../lib/components/ApodImage.svelte';
import ApodCard from '../lib/components/ApodCard.svelte';
import ApodFetcher from '../lib/components/ApodFetcher.svelte';
import DarkBackground from './DarkBackground.svelte';

export default {
	title: 'APOD',
	decorators: [() => ({ Component: DarkBackground })]
};

// ────────────────────────────────────────────────────────────────────────────
// ApodHeader
// ────────────────────────────────────────────────────────────────────────────
export const Header = {
	name: 'ApodHeader',
	render: () => ({
		Component: ApodHeader
	})
};

// ────────────────────────────────────────────────────────────────────────────
// ApodDatePicker
// ────────────────────────────────────────────────────────────────────────────
export const DatePickerDefault = {
	name: 'ApodDatePicker / Default',
	render: () => ({
		Component: ApodDatePicker,
		props: {
			value: '',
			loading: false,
			maxDate: new Date().toISOString().split('T')[0],
			onFetch: () => console.log('fetch triggered')
		}
	})
};

export const DatePickerLoading = {
	name: 'ApodDatePicker / Loading',
	render: () => ({
		Component: ApodDatePicker,
		props: {
			value: '2024-07-04',
			loading: true,
			maxDate: '2099-12-31',
			onFetch: () => {}
		}
	})
};

// ────────────────────────────────────────────────────────────────────────────
// ApodImage
// ────────────────────────────────────────────────────────────────────────────
export const ImageMedia = {
	name: 'ApodImage / Image',
	render: () => ({
		Component: ApodImage,
		props: {
			src: 'https://apod.nasa.gov/apod/image/2603/NGC3190-APOD1024.jpg',
			title: 'Milky Way Arch Over Tuscany',
			mediaType: 'image'
		}
	})
};

export const VideoMedia = {
	name: 'ApodImage / Video',
	render: () => ({
		Component: ApodImage,
		props: {
			src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			title: 'Sample APOD Video',
			mediaType: 'video'
		}
	})
};

// ────────────────────────────────────────────────────────────────────────────
// ApodCard
// ────────────────────────────────────────────────────────────────────────────
const sampleCard = {
	title: 'Milky Way Arch Over Tuscany',
	date: '2024-07-04',
	explanation:
		'On some nights the sky is the limit. On this clear night the band of our Milky Way Galaxy arched across the sky over Tuscany, Italy.',
	url: 'https://apod.nasa.gov/apod/image/2603/NGC3190-APOD1024.jpg',
	mediaType: 'image'
};

export const CardWithImage = {
	name: 'ApodCard / Image',
	render: () => ({
		Component: ApodCard,
		props: sampleCard
	})
};

export const CardWithVideo = {
	name: 'ApodCard / Video',
	render: () => ({
		Component: ApodCard,
		props: {
			...sampleCard,
			url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			mediaType: 'video'
		}
	})
};

// ────────────────────────────────────────────────────────────────────────────
// ApodFetcher (full integration — requires real API wiring)
// ────────────────────────────────────────────────────────────────────────────
export const FetcherDefault = {
	name: 'ApodFetcher / Full integration',
	render: () => ({
		Component: ApodFetcher
	})
};
