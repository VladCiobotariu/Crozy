import React from "react";
import CheckoutPageContent from "@/components/organisms/checkout/CheckoutPageContent";
import { graphql } from "@/gql";
import { getClient } from "@/lib/apolloClientFactoryRSC";

type CheckoutPageProps = {
  searchParams: {
    siteId: string;
  }
};

const getSiteDeliveryInfoQueryDocument = graphql(/* GraphQL */ `
  query getSiteDeliveryInfoQuery($siteId: ID!) {
    siteById(id: $siteId) {
      ...SiteDeliveryInfo
    }
  }
`);

const CheckoutPage = async ({ searchParams }: CheckoutPageProps) => {
  const siteId  = decodeURIComponent(searchParams.siteId);
  const client = getClient();
  const { data, error, loading } = await client.query({
    query: getSiteDeliveryInfoQueryDocument,
    variables: { siteId }
  });

  return (
    <CheckoutPageContent deliveryInfo={data.siteById}/>
  );
};

export default CheckoutPage;
