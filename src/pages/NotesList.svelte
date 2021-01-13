<script>
  import { notes, usr, filterTags } from "@/store/state";

  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  import NotePrew from "@/components/dashboard/NotePrew.svelte";
  import { createNote } from "@/assets/js/handleNote";
  import { updateFilter } from "@/assets/js/filterNotes";

  let username = sessionStorage.getItem("uID");
  let tags = [];
  if (localStorage.getItem("filter"))
    filterTags.set(JSON.parse(localStorage.getItem("filter")));

  notes.subscribe((n) => {
    tags = [];
    n.map((note) => {
      return note.data.content.tags;
    }).forEach((noteTags) => {
      tags = [...tags, ...noteTags];
    });
    tags = [...new Set(tags)];
    filterTags.update((tagsValue) =>
      tagsValue.filter((filterItem) => tags.includes(filterItem))
    );
    if (!$filterTags) filterTags.set(tags);
    localStorage.setItem("filter", JSON.stringify($filterTags));
  });

  const [receive] = crossfade({
    duration: 250,
    fallback() {
      return {
        duration: 250,
        css: (t) => `
          transform: translate(0px, ${10 * (1 - t)}px);
          opacity: ${t};
        `,
      };
    },
  });
</script>

<div class="p-5">
  <header class="flex justify-between">
    <button
      on:click={async () => {
        await createNote(username);
      }}
      class="z-10 bg-purple-600 shadow-md p-2 rounded text-white hover:bg-purple-800 transition-colors">
      + Create Note
    </button>
    <div class="relative group">
      <button
        class="flex items-center justify-center space-x-2 shadow-md bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-800 dark:group-hover:bg-gray-900 transition-colors p-3 rounded">
        <i class="fas fa-filter" /><span>+ Select filter</span><i
          class="fas fa-sort-down" />
      </button>
      <div
        class="dropdown absolute hidden group-hover:block top-full w-full p-4 z-10 bg-gray-200 dark:bg-gray-900">
        <ul>
          {#each tags as tag}
            <li class="list-none flex my-2 items-center space-x-2">
              <input
                type="checkbox"
                class="form-checkbox text-purple-500 text-sm rounded h-5 w-5 cursor-pointer"
                checked={$filterTags.includes(tag)}
                data-value={tag}
                on:change={updateFilter} />
              <span>{tag}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </header>
  {#each $notes as note (Object.values(note.ref)[0].id)}
    <div
      class={note.data.content.tags.some((t) =>
        $filterTags.includes(t)
      ) || note.data.content.tags.length == 0 ? '' : 'hidden'}
      in:receive={{ key: Object.values(note.ref)[0].id }}
      animate:flip={{ duration: 200 }}>
      <NotePrew docData={note} />
    </div>
  {/each}
</div>
