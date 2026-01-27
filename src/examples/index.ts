import { runProductCategorySearch } from './product-category-search';
import { runProductSearch } from './product-search';
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
];
