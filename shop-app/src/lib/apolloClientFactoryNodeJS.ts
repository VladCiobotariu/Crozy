import { createGraphQlClient } from "./apolloClientFactory";

export const createGraphQlClientForNodeJS = ({
  apiUrl: optionalApiUrl,
  accessToken,
}: {
  apiUrl?: string;
  accessToken: string | undefined | null;
}) => {
  const getAccessToken = async () => {
    return accessToken;
  };
  const apiUrl = optionalApiUrl ?? process.env.GRAPHQL_API_URL!;
  return createGraphQlClient({ apiUrl, getAccessToken });
};
