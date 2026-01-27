import {
  Recommender,
  SortProductsBuilder,
  UserFactory,
} from '@relewise/client';

export interface SortProductsOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runSortProducts(options: SortProductsOptions = {}) {
  const { datasetId, apiKey, serverUrl } = options;

  if (!datasetId || !apiKey || !serverUrl) {
    throw new Error(
      'Missing required fields. Please provide them in the input fields above.'
    );
  }

  const settings = {
    language: 'en', // Change these variables to match your dataset
    currency: 'EUR', // Change these variables to match your dataset
    displayedAtLocation: 'Stackblitz Playground',
    user: UserFactory.anonymous(),
  };

  const productIds = ['p-1', 'p-2', 'p-3']; // Replace with real product IDs

  const builder = new SortProductsBuilder(settings)
    .setProductIds(productIds)
    .setNumberOfRecommendations(productIds.length);

  const recommender = new Recommender(datasetId, apiKey, {
    serverUrl,
  });

  const response = await recommender.sortProducts(builder.build());
  return response;
}
