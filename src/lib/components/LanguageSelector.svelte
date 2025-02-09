<script lang="ts">
	import { locale, locales } from '$lib/i18n';
</script>

<select bind:value={$locale} class="language-selector">
	{#each $locales as lang}
		<option value={lang}>{lang}</option>
	{/each}
</select>

<style>
	.language-selector {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		background-color: white;
	}
</style>
