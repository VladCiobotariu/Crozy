import React from "react";
import { graphql } from "@/gql";
import SiteProducts from "@/components/organisms/site-products/SiteProducts";
import { getClient } from "@/lib/apolloClientFactoryRSC";
import { Metadata } from 'next'

const getSiteBySlugQueryDocument = graphql(/* GraphQL */ `
  query getSiteBySlugQuery($slug: String!) {
    siteBySlug(slug: $slug) {
      ...SiteDetails
    }
  }
`);
 
export const metadata: Metadata = {
  title: 'Crozy',
}

const HomePage = async () => {
  const client = getClient();
  const { data, error } = await client.query({
    query: getSiteBySlugQueryDocument,
    variables: { slug: "delta-cafe" },
  });

  return (
    <>
      {data ? <SiteProducts site={data?.siteBySlug}></SiteProducts> : <>Nici un produs valabil.</>}
    </>
  );
};

export default HomePage;