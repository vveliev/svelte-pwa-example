import { writable } from 'svelte/store';

interface User {
	name: string;
	email: string;
	// Add other user properties as needed
}

const user = writable<User | null>(null);

export { user };
