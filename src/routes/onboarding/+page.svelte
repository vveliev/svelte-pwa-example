<script lang="ts">
  import { onboardingCompleted } from '../../stores/onboarding';
  import { onboardingStep } from '../../stores/onboardingStep';
  import { user } from '../../stores/user';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import { t, locale } from '$lib/i18n';
  import { onMount } from 'svelte';

  let userName = '';
  let ageCategory = '';
  let age = '';
  let siblings = [];
  let friends = [];
  let newSiblingName = '';
  let newSiblingAge = '';
  let newFriendName = '';
  let newFriendAge = '';
  let lookUpTo = '';
  let conflictWith = '';
  let loaded = false;

  $: {
    if (age < 13) {
      ageCategory = 'Kid';
    } else if (age >= 13 && age < 20) {
      ageCategory = 'Teenager';
    } else {
      ageCategory = 'Adult';
    }
  }

  onMount(() => {
    locale.subscribe(() => {
      loaded = true;
    });
  });

  function saveUserInfo() {
    user.set({ name: userName, age, ageCategory });
    onboardingStep.set(2);
  }

  function addSibling() {
    if (newSiblingName.trim() && newSiblingAge) {
      siblings = [...siblings, { name: newSiblingName.trim(), age: newSiblingAge }];
      newSiblingName = '';
      newSiblingAge = '';
    }
  }

  function addFriend() {
    if (newFriendName.trim() && newFriendAge) {
      friends = [...friends, { name: newFriendName.trim(), age: newFriendAge }];
      newFriendName = '';
      newFriendAge = '';
    }
  }

  function saveSiblingsAndFriends() {
    onboardingStep.set(3);
  }

  function savePersonalization() {
    localStorage.setItem('onboardingAnswers', JSON.stringify({ ageCategory, age, siblings, friends, lookUpTo, conflictWith }));
    onboardingCompleted.set(true);
    goto('/');
  }

  function skipOnboarding() {
    localStorage.setItem('skipOnboarding', 'true');
    onboardingCompleted.set(true);
    goto('/');
  }
</script>

<style>
  .onboarding-container {
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align items to the start to move them up */
    min-height: 100vh;
    background-color: #f9fafb;
    padding-top: 2rem; /* Add padding to the top to create some space */
  }

  .onboarding-content {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .button-group button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
  }

  .button-primary {
    background-color: #3b82f6;
    color: #ffffff;
  }

  .button-secondary {
    background-color: #6b7280;
    color: #ffffff;
  }

  .button-add {
    background-color: #10b981;
    color: #ffffff;
    margin-top: 1rem;
  }

  .list-disc {
    margin-top: 1rem;
    padding-left: 1.25rem;
  }
</style>

<div class="onboarding-container">
  {#if loaded}
    {#if $onboardingStep === 1}
      <div class="onboarding-content">
        <h1 class="text-2xl font-bold mb-4">{$t('onboarding.user_information')}</h1>
        <div class="form-group">
          <label for="userName">{$t('onboarding.name')}:</label>
          <input id="userName" type="text" bind:value={userName} />
        </div>
        <div class="form-group">
          <label for="age">{$t('onboarding.age')}:</label>
          <input id="age" type="number" bind:value={age} />
        </div>
        <div class="form-group">
          <label for="ageCategory">{$t('onboarding.age_category')}:</label>
          <p id="ageCategory" class="w-full p-2 border border-gray-300 rounded-md">{ageCategory}</p>
        </div>
        <div class="button-group">
          <button on:click={saveUserInfo} class="button-primary">{$t('onboarding.next')}</button>
          <button on:click={skipOnboarding} class="button-secondary">{$t('onboarding.skip')}</button>
        </div>
      </div>
    {:else if $onboardingStep === 2}
      <div class="onboarding-content">
        <h1 class="text-2xl font-bold mb-4">{$t('onboarding.add_siblings')}</h1>
        <div class="form-group">
          <label for="newSiblingName">{$t('onboarding.name')}:</label>
          <input id="newSiblingName" type="text" bind:value={newSiblingName} />
        </div>
        <div class="form-group">
          <label for="newSiblingAge">{$t('onboarding.age')}:</label>
          <input id="newSiblingAge" type="number" bind:value={newSiblingAge} />
        </div>
        <button on:click={addSibling} class="button-add">{$t('onboarding.add_sibling')}</button>
        <ul class="list-disc">
          {#each siblings as sibling}
            <li>{sibling.name} ({sibling.age} years old)</li>
          {/each}
        </ul>
        <h1 class="text-2xl font-bold mb-4 mt-8">{$t('onboarding.add_friends')}</h1>
        <div class="form-group">
          <label for="newFriendName">{$t('onboarding.name')}:</label>
          <input id="newFriendName" type="text" bind:value={newFriendName} />
        </div>
        <div class="form-group">
          <label for="newFriendAge">{$t('onboarding.age')}:</label>
          <input id="newFriendAge" type="number" bind:value={newFriendAge} />
        </div>
        <button on:click={addFriend} class="button-add">{$t('onboarding.add_friend')}</button>
        <ul class="list-disc">
          {#each friends as friend}
            <li>{friend.name} ({friend.age} years old)</li>
          {/each}
        </ul>
        <div class="button-group">
          <button on:click={saveSiblingsAndFriends} class="button-primary">{$t('onboarding.next')}</button>
          <button on:click={skipOnboarding} class="button-secondary">{$t('onboarding.skip')}</button>
        </div>
      </div>
    {:else if $onboardingStep === 3}
      <div class="onboarding-content">
        <h1 class="text-2xl font-bold mb-4">{$t('onboarding.personalization')}</h1>
        <div class="form-group">
          <label for="lookUpTo">{$t('onboarding.someone_you_look_up_to')}:</label>
          <input id="lookUpTo" type="text" bind:value={lookUpTo} />
        </div>
        <div class="form-group">
          <label for="conflictWith">{$t('onboarding.someone_you_are_in_conflict_with')}:</label>
          <input id="conflictWith" type="text" bind:value={conflictWith} />
        </div>
        <div class="button-group">
          <button on:click={savePersonalization} class="button-primary">{$t('onboarding.submit')}</button>
          <button on:click={skipOnboarding} class="button-secondary">{$t('onboarding.skip')}</button>
        </div>
      </div>
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</div>
