<script>
  import page from "page";

  import { deleteNote } from "@/assets/js/handleNote.js";

  export let docData;
</script>

<div
  on:click={() => page.redirect(`/dashboard/note/${Object.values(docData.ref)[0].id}`)}
  class="note-prev shadow rounded-lg xl:w-3/5 p-5 my-8 mx-auto bg-white cursor-pointer relative transition-shadow hover:shadow-xl dark:bg-gray-900">
  <div class="flex items-center">
    <div>
      {#if docData.data.content.title === ''}
        <h2>No title</h2>
      {:else}
        <h2>{docData.data.content.title}</h2>
      {/if}
    </div>
    <div class="inline-block m-3">
      <div
        class="flex space-x-3 absolute right-4 top-1/2 transform -translate-y-1/2">
        <div
          on:click={(e) => {
            e.stopPropagation();
            deleteNote(Object.values(docData.ref)[0].id);
          }}
          class="delete text-red-600 bg-purple-100 hover:bg-purple-200 p-3 rounded-full flex justify-center items-center dark:bg-purple-300 dark:hover:bg-purple-400">
          <i class="far fa-trash-alt" />
        </div>
      </div>
    </div>
  </div>
  <div class="flex space-x-2">
    {#each docData.data.content.tags as tag}
      <div class="py-1 px-2  mt-2 bg-gray-200 dark:bg-gray-500 rounded">
        {tag}
      </div>
    {/each}
  </div>
</div>
