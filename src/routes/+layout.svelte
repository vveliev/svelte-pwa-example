<script lang="ts">
  import '../app.css';
  import '../lib/i18n.ts';
  import LanguageSelector from '../components/LanguageSelector.svelte';
  import { locale } from 'svelte-i18n';

  let initialized = false;

  $: {
    if ($locale) {
      initialized = true;
    }
  }
</script>

{#if initialized}
  <LanguageSelector />
  <slot />
{:else}
  <p>Loading...</p>
{/if}
