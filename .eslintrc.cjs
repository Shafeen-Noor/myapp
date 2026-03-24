module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'prettier'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	plugins: ['svelte3'],
	rules: {},
	settings: {
		'svelte3/preprocess': true
	}
};
