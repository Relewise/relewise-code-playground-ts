import { Tracker, UserFactory } from '@relewise/client';

export interface ProductViewTrackingOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductViewTracking(
  options: ProductViewTrackingOptions = {}
) {
  const { datasetId, apiKey, serverUrl } = options;

  if (!datasetId || !apiKey || !serverUrl) {
    throw new Error(
      'Missing required fields. Please provide them in the input fields above.'
    );
  }

  const tracker = new Tracker(datasetId, apiKey, {
    serverUrl,
  });

  await tracker.trackProductView({
    productId: 'p-1', // Replace with the PDP product ID
    user: UserFactory.anonymous(), // Replace with the active user context if available
  });
}
