# AGENTS

## Repository Purpose
This Vite + React TypeScript sandbox demonstrates how to run Relewise SDK examples locally or in StackBlitz by letting users pick a canned example, provide dataset credentials, and inspect the raw response.

## Source File Guide
- `src/App.tsx`: React UI for selecting examples, entering dataset/api credentials, and displaying formatted output with basic error handling.
- `src/dev-remote-console.ts`: Patches the browser console in dev builds to forward logs to the Vite dev server so StackBlitz previews show console output.
- `src/examples/index.ts`: Central registry defining the `ExampleRunner` contract and listing which example IDs map to which runner functions.
- `src/examples/product-search.ts`: Implements `runProductSearch`, building a product search request with sample filters and executing it through the Relewise `Searcher`.
- `src/examples/search-term-prediction.ts`: Implements `runSearchTermPrediction`, constructing a prediction request that suggests search terms through Relewise.
- `src/examples/product-category-search.ts`: Implements `runProductCategorySearch`, querying categories with assortment filters and returning category data.
- `src/examples/product-listing-pages.ts`: Implements `runProductListingPages`, demonstrating PLP-specific product search with filters, facets, and sorting.
- `src/examples/search-batching.ts`: Implements `runSearchBatchingExample`, issuing multiple search requests in a single batch via `SearchCollectionBuilder`.
- `src/examples/purchased-with-product.ts`: Implements `runPurchasedWithProduct`, calling the recommender for items purchased with a specific product.
- `src/examples/products-viewed-after-viewing-product.ts`: Implements `runProductsViewedAfterViewingProduct`, requesting recommendations for items often viewed after the current PDP.
- `src/examples/power-step.ts`: Implements `runPowerStep`, a purchased-with-product recommender tailored to power step overlays.
- `src/examples/cart-page.ts`: Implements `runCartPage`, requesting purchased-with-multiple-products recommendations for cart items.
- `src/examples/recommendation-batching.ts`: Implements `runRecommendationBatching`, batching multiple product recommendation requests together.
- `src/examples/sort-products.ts`: Implements `runSortProducts`, reordering a provided list of product IDs using Relewise sorting.
- `src/examples/product-view-tracking.ts`: Implements `runProductViewTracking`, showing how to send PDP view events through the tracker.
- `src/index.css`: Global baseline styles for typography, layout spacing, and button states used across the playground UI.
- `src/main.tsx`: React entry point that bootstraps `App` inside `StrictMode`, wiring up shared styles and the remote console shim.
- `src/vite-env.d.ts`: Ambient Vite type declarations to enable TypeScript support for the Vite environment variables used in the UI.

If a file gets added or deleted, update this list to match. Every time you create, modify, or delete any file in this repository, run `npm run lint` before handing off your work and mention the touched paths in your final response.
