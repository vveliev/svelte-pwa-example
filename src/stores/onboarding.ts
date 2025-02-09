import { writable } from 'svelte/store';

const isClient = typeof window !== 'undefined';
const savedAnswers = isClient ? localStorage.getItem('onboardingAnswers') : null;
const skipOnboarding = isClient ? localStorage.getItem('skipOnboarding') === 'true' : false;
const onboardingCompleted = writable<boolean>(!!savedAnswers || skipOnboarding);

export { onboardingCompleted };
