<script>
  import { onFocus, onFocusOut } from "@/assets/js/useInput";
  import { signUp } from "@/assets/js/handleAccount";

  let user = { username: "", password: "" };
  let error = false;
  const submit = async (e) => {
    e.preventDefault();
    error = await signUp(user);
  };
</script>

<svelte:head>
  <title>Sign up</title>
</svelte:head>
<main
  class="bg-gray-100 flex-auto flex items-center dark:bg-gray-900 dark:text-gray-50">
  <form
    on:submit={submit}
    class="flex flex-col p-10 rounded-lg py-20 bg-white shadow-xl mx-auto w-max dark:bg-gray-800">
    <h1 class="m-1 mb-10 text-3xl font-bold text-center">Sign up</h1>
    {#if error}
      <div class="text-red-600">
        <i class="fas fa-times" />
        <span>Username Already exists</span>
      </div>
    {/if}
    <div class="relative my-2 mx-1 text-gray-500 dark:text-gray-200">
      <input
        on:focus={onFocus}
        on:blur={onFocusOut}
        class="border-gray-900 h-12 w-full bg-transparent border-b focus:outline-none dark:border-gray-500"
        type="text"
        name="username"
        bind:value={user.username} />
      <label
        class="block absolute top-0 transition-all transform translate-y-1/2 pointer-events-none"
        for="username">Username</label>
      <div class="line absolute bottom-0 h-px w-0 left-1/2 right-1/2" />
    </div>
    <div class="relative my-2 mx-1 text-gray-500 dark:text-gray-200">
      <input
        on:focus={onFocus}
        on:blur={onFocusOut}
        class="border-gray-900 h-12 w-full bg-transparent border-b focus:outline-none dark:border-gray-500"
        type="password"
        name="password"
        bind:value={user.password} />
      <label
        class="block absolute top-0 transition-all transform translate-y-1/2 pointer-events-none"
        for="password">Password</label>
      <div class="line absolute bottom-0 h-px w-0 left-1/2 right-1/2" />
    </div>
    <button
      type="submit"
      class="bg-purple-500 text-white w-full py-2 rounded mx-auto my-3 hover:bg-purple-700 transition-colors">
      Sing up
    </button>
    <div class="w-max flex flex-row space-x-5">
      <p class="text-center">
        Already have an account?
        <a
          href="/"
          class="underline text-purple-500 hover:text-purple-700 transition-colors">
          Log in.
        </a>
      </p>
    </div>
  </form>
</main>
