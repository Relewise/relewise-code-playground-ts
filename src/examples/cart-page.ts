import {
  PurchasedWithMultipleProductsBuilder,
  Recommender,
  UserFactory,
} from '@relewise/client';

export interface CartPageOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runCartPage(options: CartPageOptions = {}) {
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

  const builder = new PurchasedWithMultipleProductsBuilder(settings)
    .setSelectedProductProperties({
      displayName: true,
      pricing: true,
      allData: true,
    })
    // Add the products currently in the cart
    .addProducts([
      { productId: 'p-1', variantId: 'v-1' },
      { productId: 'p-2', variantId: 'v-2' },
    ])
    .setNumberOfRecommendations(10);

  const recommender = new Recommender(datasetId, apiKey, {
    serverUrl,
  });

  const response = await recommender.recommendPurchasedWithMultipleProducts(
    builder.build()
  );
  return response;
}
