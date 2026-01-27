import { runSearchBatchingExample } from './search-batching';
import { runCartPage } from './cart-page';
import { runProductCategorySearch } from './product-category-search';
import { runProductListingPages } from './product-listing-pages';
import { runProductSearch } from './product-search';
import { runProductsViewedAfterViewingProduct } from './products-viewed-after-viewing-product';
import { runPurchasedWithProduct } from './purchased-with-product';
import { runPowerStep } from './power-step';
import { runRecommendationBatching } from './recommendation-batching';
import { runSearchTermPrediction } from './search-term-prediction';

export type ExampleRunner = (opts: ExampleRunOptions) => Promise<unknown>;

export type ExampleRunOptions = {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
};

export interface ExampleDefinition {
  id: string;
  label: string;
  run: ExampleRunner;
}

// Add new examples by importing the runner and adding entries here:
// - id: unique value used internally/for the select option
// - label: text shown in the dropdown
// - run: function that executes the example
export const EXAMPLES: ExampleDefinition[] = [
  { id: 'search-term-prediction', label: 'Search Term Prediction', run: runSearchTermPrediction },
  { id: 'product-search', label: 'Product Search', run: runProductSearch },
  { id: 'product-category-search', label: 'Product Category Search', run: runProductCategorySearch },
  { id: 'product-listing-pages', label: 'Product Listing Pages', run: runProductListingPages },
  { id: 'search-batching', label: 'Search Batching', run: runSearchBatchingExample },
  { id: 'purchased-with-product', label: 'Purchased With Product', run: runPurchasedWithProduct },
  { id: 'products-viewed-after-viewing-product', label: 'Products Viewed After Viewing Product', run: runProductsViewedAfterViewingProduct },
  { id: 'power-step', label: 'Power Step', run: runPowerStep },
  { id: 'cart-page', label: 'Cart Page', run: runCartPage },
  { id: 'recommendation-batching', label: 'Recommendation Batching', run: runRecommendationBatching },
];
