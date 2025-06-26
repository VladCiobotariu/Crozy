import React from "react";
import { graphql } from "@/gql";
import SiteProducts from "@/components/organisms/site-products/SiteProducts";
import { getClient } from "@/lib/apolloClientFactoryRSC";
import type { Metadata, ResolvingMetadata } from 'next'
import { Typography } from "@mui/joy";

const getSiteBySlugQueryDocument = graphql(/* GraphQL */ `
  query getSiteBySlugForSitePageQuery($slug: String!) {
    siteBySlug(slug: $slug) {
      name
      ...SiteDetails
    }
  }
`);


export async function generateMetadata(
  { params }: ViewSitePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const siteSlug = params.site
 
  // fetch data
  const client = getClient();
  const { data, error } = await client.query({
    query: getSiteBySlugQueryDocument,
    variables: { slug: siteSlug},
  });
 
  return {
    title: data.siteBySlug.name,
  }
}

type ViewSitePageProps = {
  params: {
    site: string;
  };
  searchParams: { category: string | undefined }
}

const SitePage = async ({ params, searchParams } : ViewSitePageProps) => {
  
  const client = getClient();
  const { data, error } = await client.query({
    query: getSiteBySlugQueryDocument,
    variables: { slug: params.site},
  });

  return (
    <>
      <Typography sx={({
        textAlign: "center",
        pb: "1rem",
      })} level="h3">
        {data.siteBySlug.name}
      </Typography>
      {data ? <SiteProducts site={data?.siteBySlug} scrollToCategory={searchParams.category}></SiteProducts> : <>Nici un produs valabil.</>}
    </>
  );
};

export default SitePage;