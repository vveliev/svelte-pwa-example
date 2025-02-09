<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Header from '$lib/components/Header.svelte';
	import { onboardingCompleted } from '../stores/onboarding';
	import { user } from '../stores/user';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(() => {
		if (typeof window !== 'undefined') {
			const savedAnswers = localStorage.getItem('onboardingAnswers');
			const skipOnboarding = localStorage.getItem('skipOnboarding') === 'true';
			if (!savedAnswers && !skipOnboarding) {
				onboardingCompleted.set(false);
				if ($page.url.pathname !== '/onboarding') {
					goto('/onboarding');
				}
			} else {
				onboardingCompleted.set(true);
			}
		}
	});
</script>

<ParaglideJS {i18n}>
	<Header />
	<div class="container mx-auto p-4">
		{@render children()}
	</div>
</ParaglideJS>
