/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  scripts: { "build:css": "postcss" },
  plugins: [
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-optimize",
  ],
  install: [],
  installOptions: {},
  devOptions: {},
  buildOptions: {},
  proxy: {},
  alias: {
    "@": "./src",
  },
};
