import { writable } from 'svelte/store';

export let appData = writable({});
export let domainId = writable('');
export let backendId = writable('');
export let headlessId = writable('');
export let ioId = writable('');