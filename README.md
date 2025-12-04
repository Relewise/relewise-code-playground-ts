# Relewise Playground (StackBlitz)

Open this project in StackBlitz to view and run Relewise code examples with the editor and preview side by side.

## How it works
- Built with Vite + React; start script: `npm run dev`.
- The app has a dropdown—pick an example, fill the fields, click Run. No default selection.
- Examples live in `src/examples/` (current: `search-term-prediction.ts`, `product-search.ts`).

## Add a new example
1) Create a file in `src/examples/` exporting a `run...` function matching the existing ones.
2) Register it in `src/App.tsx` inside the `EXAMPLES` array (add `id`, `label`, `run`).

## Environment variables
- You can provide defaults via `.env` at the project root:
  - `VITE_DATASET_ID`
  - `VITE_API_KEY`
  - `VITE_SERVER_URL`
- If the input fields are left blank, the app will use these env values.
- See `.env.example` for the keys; keep your own `.env` untracked.

## Local usage
- Install deps: `npm install`
- Run dev server: `npm run dev` and open the printed URL.
