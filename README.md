# NoteMasta

School project note taking app built with **[SvelteJS](https://svelte.dev)**. App uses **[QuillJS](https://quilljs.com/)** as text editor.

### [Demo](https://notemasta.netlify.app)

## Required Enviroment Variables

Server address as `SNOWPACK_PUBLIC_API_URL`, for demo the server address is https://notemasta-api.herokuapp.com

## Running it

1. Donwload this repo
2. Create `.env` in the root directory with:

```
SNOWPACK_PUBLIC_API_URL=<your-backend-url>
```

3. Run `npm i` or `npm install`
4. Run `npm run start` for development mode on http://localhost:8080. Or run `npm run build` for production -> static copy of site in `build/` folder.
