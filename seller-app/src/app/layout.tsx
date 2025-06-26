import React from "react";
import AdminLayout from "./AdminLayout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { b2cFederatedLogoutUrl } from "@/lib/azureB2CUtils";
import { auth } from "./auth";
import LoginComponent from "./LoginComponent";
import { getOrganisationId } from "@/organisation/organisationService";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = await auth();
  const organisationId = await getOrganisationId()
  return (
    <html lang="en">
      <body style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh"
      }}>
        <AppRouterCacheProvider>
          {isAuthenticated?.user ? (
            <AdminLayout
              cookieStorageOrganisationId={organisationId}
              signouturl={b2cFederatedLogoutUrl} 
              apiUrl={process.env.GRAPHQL_API_URL!} 
            >
              {children}
            </AdminLayout>
          ):( 
            <>{children}</>
          )}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
