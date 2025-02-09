<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { onMount, onDestroy } from 'svelte';
	import { onboardingCompleted } from '../stores/onboarding';
	import { user } from '../stores/user';
	import { goto } from '$app/navigation';

	let loaded = false;
	let intervalId: NodeJS.Timeout;

	onMount(() => {
		if (typeof window !== 'undefined') {
			const checkOnboardingStatus = () => {
				const savedAnswers = localStorage.getItem('onboardingAnswers');
				const skipOnboarding = localStorage.getItem('skipOnboarding') === 'true';
				if (!savedAnswers && !skipOnboarding) {
					onboardingCompleted.set(false);
					goto('/onboarding');
				} else {
					onboardingCompleted.set(true);
				}
			};

			checkOnboardingStatus();
			intervalId = setInterval(checkOnboardingStatus, 500); // Check every 5 seconds

			locale.subscribe(() => {
				loaded = true;
			});
		}
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<style>
	.main-content {
		padding: 2rem;
	}
</style>

{#if loaded}
	<div class="main-content">
		<p>{$t('documentation', { link: 'https://svelte.dev/docs/kit' })}</p>
	</div>
{:else}
	<p>Loading...</p>
{/if}
