<script>
  import Quill from "quill";
  // import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  // import "quill/themes/snow.js";

  import { onMount } from "svelte";

  import {
    saveNote,
    addNoteTag,
    removeNoteTag,
  } from "@/assets/js/handleNote.js";

  import { saving, error } from "@/store/noteSaving.js";
  import { notes } from "@/store/state.js";
  import Tag from "@/components/Tag.svelte";
  import { writable } from "svelte/store";

  export let params;

  let editor;
  let noteData;
  const saved = writable(true);

  $: noteText = noteData.data.content.text;
  $: noteTags = noteData.data.content.tags;

  const isNoteSaved = () => {
    const { title, text } = noteData.data.content;
    if (
      title !== noteTitle ||
      JSON.stringify(text) !== JSON.stringify(editor.getContents())
    ) {
      saved.set(false);
    } else {
      saved.set(true);
    }
  };

  notes.subscribe((v) => {
    noteData = v.filter((n) => Object.values(n.ref)[0].id === params.id)[0];
  });

  let noteTitle = noteData.data.content.title;
  onMount(() => {
    //create editor with toolbar
    editor = new Quill("#editor", {
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ align: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          ["clean"], // remove formatting button
        ],
      },
      placeholder: "Add note content",
      theme: "snow",
    });
    //set editor content
    editor.setContents(noteText);
    editor.on("text-change", isNoteSaved);
  });
</script>

<style>
</style>

<!-- <button on:click={console.log(editor.getContents())}>getContents</button> -->
<div class="p-5 pt-0">
  <div class="flex justify-between items-center">
    <div class="flex flex-wrap my-2 space-x-2 m-2">
      <!-- <pre>
          {JSON.stringify(noteData.data.content)}
        </pre> -->
      {#each noteTags as tagname}
        <Tag
          name={tagname}
          on:del={(e) => removeNoteTag(noteData, params.id, e.detail.tag)} />
      {/each}
      <button
        class="shadow-xl rounded bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-900 text-black transition-colors duration-150 m-1 p-2"
        on:click={() => {
          let tag = prompt('Add new tag');
          if (tag !== null) addNoteTag(noteData, params.id, tag);
        }}>+ Add Tag</button>
    </div>
    <div class="flex items-center space-x-5">
      <div class="saving-indication text-gray-500">
        {#if $error}
          <div class="text-red-500">
            <span> error </span>
            <i class="fas fa-times" />
          </div>
        {:else if $saving}
          <div>
            <span>saving...</span>
            <i class="fas fa-spinner fa-pulse" />
          </div>
        {:else if $saved}
          <div class="flex items-center space-x-2">
            <span>saved</span>
            <i class="far fa-check" />
          </div>
        {:else}
          <div class="flex items-center space-x-2">
            <span>Save is needed</span>
            <i class="fas fa-exclamation-triangle text-yellow-500" />
          </div>
        {/if}
      </div>
      <button
        class="px-4 py-2 bg-purple-500 hover:bg-purple-700 transition-colors rounded my-5 text-white"
        on:click={async () => {
          await saveNote(params.id, noteTitle, editor.getContents(), noteData.data.content.tags);
          isNoteSaved();
        }}>
        Save
      </button>
    </div>
  </div>
  <div>
    <input
      id="note-title"
      class="bg-transparent text-4xl mb-5 w-full font-semibold placeholder-gray-700 dark:placeholder-gray-400"
      type="text"
      placeholder="Add Title"
      maxlength="30"
      bind:value={noteTitle}
      on:change={isNoteSaved} />
    <div id="editor" class="min-h-full" />
  </div>
</div>
