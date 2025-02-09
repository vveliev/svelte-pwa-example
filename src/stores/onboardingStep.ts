import { writable } from 'svelte/store';

const onboardingStep = writable<number>(1);

export { onboardingStep };
