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

{#if loaded}
	{#if $onboardingStep === 1}
		<div class="onboarding-content max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
			<h1 class="text-2xl font-bold mb-4">{$t('onboarding.user_information')}</h1>
			<div class="mb-4">
				<label for="userName" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.name')}:</label>
				<input id="userName" type="text" bind:value={userName} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="mb-4">
				<label for="age" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.age')}:</label>
				<input id="age" type="number" bind:value={age} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="mb-4">
				<label for="ageCategory" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.age_category')}:</label>
				<p id="ageCategory" class="w-full p-2 border border-gray-300 rounded-md">{ageCategory}</p>
			</div>
			<div class="flex justify-between">
				<button on:click={saveUserInfo} class="bg-blue-500 text-white px-4 py-2 rounded-md">{$t('onboarding.next')}</button>
				<button on:click={skipOnboarding} class="bg-gray-500 text-white px-4 py-2 rounded-md">{$t('onboarding.skip')}</button>
			</div>
		</div>
	{:else if $onboardingStep === 2}
		<div class="onboarding-content max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
			<h1 class="text-2xl font-bold mb-4">{$t('onboarding.add_siblings')}</h1>
			<div class="mb-4">
				<label for="newSiblingName" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.name')}:</label>
				<input id="newSiblingName" type="text" bind:value={newSiblingName} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="mb-4">
				<label for="newSiblingAge" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.age')}:</label>
				<input id="newSiblingAge" type="number" bind:value={newSiblingAge} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<button on:click={addSibling} class="bg-green-500 text-white px-4 py-2 rounded-md mt-2">{$t('onboarding.add_sibling')}</button>
			<ul class="list-disc pl-5 mt-4">
				{#each siblings as sibling}
					<li>{sibling.name} ({sibling.age} years old)</li>
				{/each}
			</ul>
			<h1 class="text-2xl font-bold mb-4 mt-8">{$t('onboarding.add_friends')}</h1>
			<div class="mb-4">
				<label for="newFriendName" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.name')}:</label>
				<input id="newFriendName" type="text" bind:value={newFriendName} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="mb-4">
				<label for="newFriendAge" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.age')}:</label>
				<input id="newFriendAge" type="number" bind:value={newFriendAge} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<button on:click={addFriend} class="bg-green-500 text-white px-4 py-2 rounded-md mt-2">{$t('onboarding.add_friend')}</button>
			<ul class="list-disc pl-5 mt-4">
				{#each friends as friend}
					<li>{friend.name} ({friend.age} years old)</li>
				{/each}
			</ul>
			<div class="flex justify-between mt-4">
				<button on:click={saveSiblingsAndFriends} class="bg-blue-500 text-white px-4 py-2 rounded-md">{$t('onboarding.next')}</button>
				<button on:click={skipOnboarding} class="bg-gray-500 text-white px-4 py-2 rounded-md">{$t('onboarding.skip')}</button>
			</div>
		</div>
	{:else if $onboardingStep === 3}
		<div class="onboarding-content max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
			<h1 class="text-2xl font-bold mb-4">{$t('onboarding.personalization')}</h1>
			<div class="mb-4">
				<label for="lookUpTo" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.someone_you_look_up_to')}:</label>
				<input id="lookUpTo" type="text" bind:value={lookUpTo} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="mb-4">
				<label for="conflictWith" class="block text-sm font-medium text-gray-700 mb-1">{$t('onboarding.someone_you_are_in_conflict_with')}:</label>
				<input id="conflictWith" type="text" bind:value={conflictWith} class="w-full p-2 border border-gray-300 rounded-md" />
			</div>
			<div class="flex justify-between mt-4">
				<button on:click={savePersonalization} class="bg-blue-500 text-white px-4 py-2 rounded-md">{$t('onboarding.submit')}</button>
				<button on:click={skipOnboarding} class="bg-gray-500 text-white px-4 py-2 rounded-md">{$t('onboarding.skip')}</button>
			</div>
		</div>
	{/if}
{:else}
	<p>Loading...</p>
{/if}
