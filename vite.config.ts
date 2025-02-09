import tailwindcss from '@tailwindcss/vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		tailwindcss()
	],

	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
