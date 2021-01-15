<script>
  import page from "page";
  import Logo from "@/components/Logo.svelte";
  import ModeToggler from "@/components/ModeToggler.svelte";
  import Loader from "@/components/Loader.svelte";

  import { logOut } from "@/assets/js/handleAccount";

  import { loadNotes } from "@/assets/js/handleNote";
  import { usr } from "@/store/state.js";
  import { routeParams } from "@/store/routerState";

  let awaitNotes = loadNotes($usr);
</script>

<svelte:head>
  <title>Dashboard | NoteMasta</title>
</svelte:head>
<header class="w-screen bg-purple-600 text-white  dark:bg-purple-800">
  <nav class="flex flex-row justify-between items-center p-2">
    <div class="logo">
      <div on:click={() => page.redirect("/dashboard")} class="cursor-pointer">
        <Logo />
      </div>
    </div>
    <div class="links">
      <a href="/" class="" on:click={(event) => logOut(event)}>Logout</a>
      <ModeToggler />
    </div>
  </nav>
</header>
<main
  class="bg-gray-100 flex flex-col flex-auto overflow-y-scroll dark:bg-gray-800 dark:text-gray-100"
>
  <div class="flex flex-auto overflow-auto">
    <section class="w-full flex-auto relative">
      {#await awaitNotes}
        <Loader />
      {:then}
        <slot />
      {/await}
    </section>
  </div>
</main>
