import { auth } from "@/app/auth";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { createGraphQlClient } from "./apolloClientFactory";

export const createGraphQlClientForServerComponent = ({
  apiUrl: optionalApiUrl,
}: {
  apiUrl?: string;
}) => {
  const getAccessToken = async () => {
    const session = await auth();
    return session?.token;
  };
  const apiUrl = optionalApiUrl ?? process.env.GRAPHQL_API_URL!;
  return createGraphQlClient({ apiUrl, getAccessToken });
};

export const createApoloClientForBackend = (): ApolloClient<NormalizedCacheObject> => {
  return createGraphQlClientForServerComponent({ apiUrl: process.env.GRAPHQL_API_URL! });
};

export const { getClient } = registerApolloClient(createApoloClientForBackend);
