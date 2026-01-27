# Relewise Playground (StackBlitz)
Use this StackBlitz project to explore Relewise requests with live code on the left and an interactive runner on the right.

https://stackblitz.com/~/github.com/Relewise/relewise-code-playground-ts

## Launch and add your credentials
1. The editor (left) shows the source code, and the preview (right) contains the playground UI.
2. In the file tree, duplicate `.env.example` to `.env` and paste your dataset values for:
   - `VITE_DATASET_ID`
   - `VITE_API_KEY`
   - `VITE_SERVER_URL`
3. Save the file—these become the defaults the playground uses whenever a field in the UI is blank.

## Pick and customize an example
1. Browse `src/examples/` and open the scenario you want to try (for example, `product-view-tracking.ts` or `sort-products.ts`).
2. Edit any request parameters or code you need. StackBlitz hot-reloads instantly, so you can iterate quickly.
3. In the right-hand panel, choose the same example from the dropdown so the UI runs the code you just edited.

## Run the request and inspect the response
1. Click **Run** to execute the example with the credentials and parameters currently shown in the UI.
2. The playground sends the request to Relewise and renders the raw JSON response in the results box below the controls.
3. Adjust your code or form values and click **Run** again to compare outputs—each run replaces the contents of the response box so you always see the latest data.
