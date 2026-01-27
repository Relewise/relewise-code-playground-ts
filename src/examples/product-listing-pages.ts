import {
  ProductSearchBuilder,
  Searcher,
  UserFactory,
} from '@relewise/client';

export interface ProductListingPagesOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductListingPages(
  options: ProductListingPagesOptions = {}
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

  const builder = new ProductSearchBuilder(settings)
    .setSelectedProductProperties({
      displayName: true,
      pricing: true,
      dataKeys: ['Url', 'ShortDescription', 'ImageUrls', 'DK_*'], // Change these variables to match your dataset
    })
    .pagination((p) => p.setPageSize(30).setPage(1))
    .facets((f) =>
      f
        .addBrandFacet(['HP', 'Lenovo'])
        .addSalesPriceRangeFacet('Product', 100, 500)
        .addVariantSpecificationFacet('Size', ['XL'])
    )
    .filters((f) =>
      f
        .addProductAssortmentFilter(1)
        .addVariantAssortmentFilter(1)
        .addProductCategoryIdFilter('ImmediateParent', ['category_id']) // Change category_id to the category ID for the PLP
    )
    .sorting((s) =>
      s.sortByProductData('InStock', 'Product', 'Descending', (n) =>
        n.sortByProductRelevance()
      )
    );

  const searcher = new Searcher(datasetId, apiKey, {
    serverUrl,
  });

  const response = await searcher.searchProducts(builder.build());
  return response;
}
