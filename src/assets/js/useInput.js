export const onFocus = (e) => {
  e.target.parentElement.classList.add("is-focused", "is-visited");
};

export const onFocusOut = (e) => {
  e.target.parentElement.classList.remove("is-focused");
};

export const resetForms = () => {
  document.querySelectorAll(".is-visited").forEach((element) => {
    element.querySelector("input").value = "";
    element.classList.remove("is-visited");
  });
};
