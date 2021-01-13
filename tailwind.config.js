module.exports = {
  purge: ["./src/**/*.svelte", "./public/*.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      display: ["group-hover", "hover"],
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
