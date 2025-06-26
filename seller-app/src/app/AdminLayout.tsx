"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { DeliveryAdminTheme } from "../components/atoms/theme/Theme";
import AuthLayout from "../components/organisms/layouts/AuthLayout";
import { OrganisationProvider } from "../providers/OrganisationProvider";
import { SessionProvider } from 'next-auth/react';
import { createGraphQlClientForClientComponent } from "@/lib/apolloClientFactoryRCC";

type AdminLayoutProps = {
  children: React.ReactNode;
  signouturl: string;
  apiUrl: string;
  cookieStorageOrganisationId: string | undefined
};

const AdminLayout = ({ children, signouturl, apiUrl, cookieStorageOrganisationId }: AdminLayoutProps) => {
  const client = createGraphQlClientForClientComponent({ apiUrl });
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={DeliveryAdminTheme}>
            <OrganisationProvider
              cookieStorageOrganisationId={cookieStorageOrganisationId}
            >
              <AuthLayout signouturl={signouturl}>
                  {children}
              </AuthLayout>
            </OrganisationProvider>
        </ThemeProvider>
      </ApolloProvider>
   </SessionProvider>
  );
};

export default AdminLayout;
