<script>
  import { locale, locales } from 'svelte-i18n';

  function changeLanguage(event) {
    locale.set(event.target.value);
  }
</script>

<select on:change={changeLanguage} class="language-selector">
  {#each $locales as lang}
    <option value={lang}>{lang}</option>
  {/each}
</select>

<style>
  .language-selector {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
</style>
