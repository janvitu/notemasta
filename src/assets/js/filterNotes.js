import { get } from "svelte/store";
import { filterTags } from "@/store/state";
/**
 * updates dashboard filter
 */
export const updateFilter = (e) => {
  const { target } = e;
  if (target.checked) {
    filterTags.update((tagsValue) => [...tagsValue, target.dataset.value]);
  } else {
    filterTags.update((tagsValue) =>
      tagsValue.filter((filterItem) => filterItem !== target.dataset.value)
    );
  }
  localStorage.setItem("filter", JSON.stringify(get(filterTags)));
};
