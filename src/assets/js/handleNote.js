import axios from "axios";
import page from "page";
import { notes, filterTags } from "@/store/state";
import { get } from "svelte/store";
import { error, saving } from "../../store/noteSaving";
/**
 * Creates new note document
 * @param { String } username
 */
export const createNote = async (username) => {
  let response;
  try {
    response = await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/note`,
      {
        username: username,
      }
    );
    notes.update((val) => [...val, response.data]);
    page.redirect(`/dashboard/note/${Object.values(response.data.ref)[0].id}`);
  } catch (err) {
    console.error(`Error create ${err}`);
  }
  return response.data;
};
/**
 * updates targeted note document
 * @param { Number } docID
 * @param { Object } text
 * @param { Array } tags
 */
export const saveNote = async (docID, noteTitle, text, tags) => {
  error.set(false);
  const content = {
    title: noteTitle,
    text: text,
    tags: tags,
  };
  const data = {
    docID: docID,
    content: content,
  };
  try {
    saving.set(true);
    await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/note/update`,
      data
    );
    let notesVal = get(notes);
    notesVal = notesVal.map((n) => {
      if (Object.values(n.ref)[0].id === docID) {
        n.data.content = content;
      }
      return n;
    });
    notes.update(() => notesVal);
    saving.set(false);
  } catch (err) {
    error.set(true);
    console.error(err);
  }
};
/**
 * Deletes targeted note document
 * @param { Number } docID
 */
export const deleteNote = async (docID) => {
  let data;
  try {
    data = await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/note/delete`,
      {
        docID: docID,
      }
    );
    notes.update((val) =>
      val.filter(
        (n) => Object.values(n.ref)[0].id !== Object.values(data.data.ref)[0].id
      )
    );
  } catch (err) {
    console.error(`Error in delete ${err}`);
  }
  return data;
};
/**
 * Get all notes for certain user
 * @param { String } username
 */
export const loadNotes = async (username) => {
  let data;
  try {
    data = await axios.get(`${import.meta.env.SNOWPACK_PUBLIC_API_URL}/notes`, {
      params: { username: username },
    });
    notes.set(data.data);
  } catch (err) {
    console.error(`Error in load ${err}`);
  }
  return data;
};
/**
 * Adds tag to selected document (in this case to selected note)
 * @param { Object } note
 * @param { Number } docID
 * @param { String } tag
 */
export const addNoteTag = async (note, docID, tag) => {
  try {
    await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/note/update/tags`,
      {
        docID: docID,
        tags: [...note.data.content.tags, tag],
      }
    );
    let notesVal = get(notes);
    notesVal = notesVal.map((n) => {
      if (Object.values(n.ref)[0].id === docID) {
        n.data.content.tags = [...n.data.content.tags, tag];
      }
      return n;
    });
    notes.update(() => notesVal);
    let fTags = get(filterTags);
    if (!fTags.includes(tag)) {
      filterTags.update((ft) => [...ft, tag]);
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Function removes selected tag from note
 * @param { Object } note
 * @param { Number } docID
 * @param { String } tag
 */
export const removeNoteTag = async (note, docID, tag) => {
  const noteTags = note.data.content.tags.filter((val) => val !== tag);
  try {
    await axios.post(
      `${import.meta.env.SNOWPACK_PUBLIC_API_URL}/note/update/tags`,
      {
        docID: docID,
        tags: noteTags,
      }
    );
    let notesVal = get(notes).map((n) => {
      if (Object.values(n.ref)[0].id === docID) {
        n.data.content.tags = noteTags;
      }
      return n;
    });
    notes.update(() => notesVal);
  } catch (err) {
    console.error(err);
  }
};
