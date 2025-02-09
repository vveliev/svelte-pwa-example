import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
export const i18n = createI18n(runtime);

import { writable } from 'svelte/store';
import { derived, readable } from 'svelte/store';

const localeFiles = import.meta.glob('../locale/*.json');
const availableLocales = Object.keys(localeFiles).map(file => file.match(/\/(\w+)\.json$/)[1]);

export const locales = readable(availableLocales);
export const locale = writable(availableLocales[0]);

let translations = {};
const loadTranslations = async () => {
	for (const [path, resolver] of Object.entries(localeFiles)) {
		const locale = path.match(/\/(\w+)\.json$/)[1];
		const module = await resolver();
		translations[locale] = module.default;
	}
};

const translationsLoaded = loadTranslations();

const renderMessage = (message, values) => {
	return message.replace(/{(\w+)}/g, (_, key) => values[key] || `{${key}}`);
};

export const t = derived(
	locale,
	($locale, set) => {
		translationsLoaded.then(() => {
			set((key, values = {}) => {
				const message = translations[$locale]?.[key] || key;
				return renderMessage(message, values);
			});
		});
	},
	(key, values = {}) => key // default value while loading
);
