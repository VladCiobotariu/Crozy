import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const createGraphQlClient = ({
  apiUrl,
  getAccessToken,
}: {
  apiUrl: string;
  getAccessToken(): Promise<string | undefined | null>;
}) => {
  const httpLink = createHttpLink({ uri: apiUrl });
  const withToken = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken();

    const result = accessToken
      ? {
          headers: {
            ...headers,
            authorization: `Bearer ${accessToken}`,
          },
        }
      : {};

    return result;
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([withToken, httpLink]),
  });

  return client;
};
