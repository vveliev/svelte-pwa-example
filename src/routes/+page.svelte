<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { onMount } from 'svelte';

	let loaded = false;

	onMount(() => {
		locale.subscribe(() => {
			loaded = true;
		});
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
