import { writable } from "svelte/store";

import Login from "@/pages/account/Login.svelte";

const routeCurrent = writable(Login);

const routeParams = writable();

export { routeCurrent, routeParams };
