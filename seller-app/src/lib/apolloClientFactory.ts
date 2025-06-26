import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getOrganisationId } from "@/organisation/organisationService";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const createGraphQlClient = ({
  apiUrl,
  getAccessToken,
}: {
  apiUrl: string;
  getAccessToken(): Promise<string | undefined | null>;
}) => {
  const httpLink = createUploadLink({ uri: apiUrl });

  const withToken = setContext(async (_, { headers }) => {
    const accessToken = await getAccessToken();
    const organisationId = await getOrganisationId();

    const organisationHeader = organisationId ? {
      "Organisation-Id": organisationId
    } : {};

    const accessTokenHeader = accessToken ? {
      Authorization: `Bearer ${accessToken}`
    } : {};

    const result = accessToken
      ? {
          headers: {
            ...headers,
            ...organisationHeader,
            ...accessTokenHeader,
            "Deafault-Organisation": !organisationId,
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
