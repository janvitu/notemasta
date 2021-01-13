<script>
  import { createEventDispatcher } from "svelte";

  export let name;

  let dispatcher = createEventDispatcher();

  const del = (name) => {
    dispatcher("del", {
      tag: name,
    });
  };
</script>

<div
  class="tag group relative flex space-x-1 m-1 p-2 rounded shadow-xl bg-gray-200 dark:bg-gray-500 items-center">
  <i class="fab fa-slack-hash" />
  <span>{name}</span>
  <div
    on:click={() => del(name)}
    class="delete-btn hidden absolute group-hover:block top-0 right-0 rounded-full bg-gray-700 text-gray-100 w-4 h-4 text-xs text-center transform translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer">
    <i class="fas fa-times" />
  </div>
</div>
