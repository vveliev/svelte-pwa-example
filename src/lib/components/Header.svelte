<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { onMount } from 'svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';

	let loaded = false;

	onMount(() => {
		locale.subscribe(() => {
			loaded = true;
		});
	});
</script>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #f8f9fa;
		border-bottom: 1px solid #dee2e6;
	}
</style>

{#if loaded}
	<header>
		<h1>{$t('welcome', { company: $t('company') })}</h1>
		<LanguageSelector />
	</header>
{:else}
	<p>Loading...</p>
{/if}
