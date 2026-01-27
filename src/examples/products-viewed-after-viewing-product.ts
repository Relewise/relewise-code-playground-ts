import {
  ProductsViewedAfterViewingProductBuilder,
  Recommender,
  UserFactory,
} from '@relewise/client';

export interface ProductsViewedAfterViewingProductOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductsViewedAfterViewingProduct(
  options: ProductsViewedAfterViewingProductOptions = {}
) {
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

  const builder = new ProductsViewedAfterViewingProductBuilder(settings)
    .setSelectedProductProperties({
      displayName: true,
      pricing: true,
      allData: true,
    })
    // Add the product ID and optional variant ID
    .product({
      productId: 'p-1',
      variantId: 'v-1',
    })
    .setNumberOfRecommendations(10);

  const recommender = new Recommender(datasetId, apiKey, {
    serverUrl,
  });

  const response =
    await recommender.recommendProductsViewedAfterViewingProduct(
      builder.build()
    );
  return response;
}
