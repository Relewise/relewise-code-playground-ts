import {
  ProductCategorySearchBuilder,
  Searcher,
  UserFactory,
} from '@relewise/client';

export interface ProductCategorySearchOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductCategorySearch(
  options: ProductCategorySearchOptions = {}
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

  const builder = new ProductCategorySearchBuilder(settings)
    .setSelectedCategoryProperties({
      displayName: true,
      paths: true,
      dataKeys: ['Description', 'ImagePath'],
    })
    .setTerm('shoe')
    .pagination((p) => p.setPageSize(30).setPage(1))
    .filters((f) => f.addProductCategoryAssortmentFilter(1));

  const searcher = new Searcher(datasetId, apiKey, {
    serverUrl,
  });

  const response = await searcher.searchProductCategories(builder.build());
  return response;
}
