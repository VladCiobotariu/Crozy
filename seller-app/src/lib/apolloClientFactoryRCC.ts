import { createGraphQlClient } from "./apolloClientFactory";
import { getSession } from "next-auth/react";

export const createGraphQlClientForClientComponent = ({ apiUrl }: { apiUrl: string }) => {
  const getAccessToken = async () => {
    const session = await getSession();
    return session?.token;
  };
  return createGraphQlClient({ apiUrl, getAccessToken });
};
