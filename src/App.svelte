<script>
  import page from "page";
  import router from "@/router/index.js";
  import { usr } from "@/store/state";
  import { routeCurrent, routeParams } from "@/store/routerState";

  import Header from "@/components/Header.svelte";
  import Dashboard from "@/pages/Dashboard.svelte";

  import { loadNotes } from "@/assets/js/handleNote";

  console.log(import.meta.env.SNOWPACK_PUBLIC_API_URL);

  localStorage.getItem("mode") === "dark"
    ? console.log("mode: 🌙")
    : console.log("mode: ☀️");
  if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light");
  }

  usr.set(sessionStorage.getItem("uID") || localStorage.getItem("uID"));
  if ($usr !== null) loadNotes($usr);
  document.documentElement.classList.add(localStorage.getItem("mode"));

  router();
</script>

<div class="App transition-colors">
  {#if $usr === null}
    <Header />
    <svelte:component this={$routeCurrent} />
  {:else}
    <Dashboard>
      <svelte:component this={$routeCurrent} params={$routeParams} />
    </Dashboard>
  {/if}
</div>
