import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { analyzer } from 'vite-bundle-analyzer';
import path from 'path';

const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST;

export default defineConfig({
	plugins: isTest ? [svelte({ compilerOptions: { runes: true } })] : [sveltekit(), analyzer()],

	resolve: {
		alias: {
			$lib: path.resolve(__dirname, './src/lib')
		},
		conditions: ['browser']
	},

	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./tests/setup.js'],
		exclude: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/e2e/**']
	}
});
