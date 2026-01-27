import {
  ProductCategorySearchBuilder,
  ProductSearchBuilder,
  SearchCollectionBuilder,
  Searcher,
  UserFactory,
} from '@relewise/client';

export interface SearchBatchingOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runSearchBatchingExample(
  options: SearchBatchingOptions = {}
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

  const requestBuilder = new SearchCollectionBuilder()
    .addRequest(
      new ProductSearchBuilder(settings)
        .setSelectedProductProperties({
          displayName: true,
        })
        .setTerm('shoe')
        .pagination((p) => p.setPageSize(30).setPage(1))
        .facets((f) =>
          f
            .addBrandFacet()
            .addSalesPriceRangeFacet('Product')
            .addVariantSpecificationFacet('Size') // Change these variables to match your dataset
        )
        .build()
    )
    .addRequest(
      new ProductCategorySearchBuilder(settings)
        .setSelectedCategoryProperties({
          displayName: true,
          paths: true,
          dataKeys: ['Description', 'ImagePath'], // Change these variables to match your dataset
        })
        .setTerm('shoe')
        .filters((f) => f.addProductCategoryAssortmentFilter(1))
        .build()
    );

  const searcher = new Searcher(datasetId, apiKey, {
    serverUrl,
  });

  const response = await searcher.batch(requestBuilder.build());
  return response;
}
