import { createGraphQlClient } from "./apolloClientFactory";

type createApolloClientForNodeJSProps = {
  apiUrl?: string;
  accessToken: string | undefined | null;
};

export const createGraphQlClientForNodeJS = ({ apiUrl: optionalApiUrl, accessToken}: createApolloClientForNodeJSProps) => {
  const getAccessToken = async () => {
    return accessToken;
  };
  const apiUrl = optionalApiUrl ?? process.env.GRAPHQL_API_URL!;
  return createGraphQlClient({ apiUrl, getAccessToken });
};
