import { writable } from "svelte/store";

const usr = writable(null);

const notes = writable([]);

const filterTags = writable([]);

export { usr, notes, filterTags };
