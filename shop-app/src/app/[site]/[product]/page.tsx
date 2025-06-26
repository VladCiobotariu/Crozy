import React from "react";
import { graphql } from "@/gql";
import { getClient } from "@/lib/apolloClientFactoryRSC";
import ProductPageContent from "@/components/organisms/product-page/ProductPageContent";

const getProductBySlugQueryDocument = graphql(/* GraphQL */ `
  query getProductBySlugQuery($siteSlug: String!, $productSlug: String!) {
    productBySlug(siteSlug: $siteSlug, productSlug: $productSlug) {
       ...ProductFieldsFromProductSlug
    }
  }
`);
type ViewProductPageProps = {
    params: {
      site: string;
      product: string;
    };
}

const ViewProductPage = async ({ params } : ViewProductPageProps) => {

  const siteSlug = decodeURIComponent(params.site);
  const productSlug = decodeURIComponent(params.product);
  const client = getClient();
  const {data, error, loading} = await client.query({
    query: getProductBySlugQueryDocument,
    variables: {siteSlug: siteSlug, productSlug: productSlug}
  });

  return (
    <ProductPageContent product={data.productBySlug}/>  
  );
};

export default ViewProductPage;
