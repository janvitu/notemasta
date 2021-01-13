import { writable } from "svelte/store";

const saving = writable(false);

const error = writable(false);

export { saving, error };
