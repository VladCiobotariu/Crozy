import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { getCookieConsent } from "@/cookies/cookiePolicyService";
import ClientLayout from "./ClientLayout";
import { b2cFederatedLogoutUrl } from "@/lib/azureB2CUtils";
import { headers } from "next/headers";
import "./global.css";
import { FeatureFlags } from "./feature-flags";

const susiPaths = ["/azure-b2c/log-in", "/azure-b2c/sign-up", "/azure-b2c/forgot-password"]
export const dynamic = "force-dynamic";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  const cookieConsent = await getCookieConsent()

  const featureFlags: FeatureFlags = {
    cardPaymentEnabled: process.env.FEATURE_FLAG_FOR_SHOWING_CARD_PAYMENTS === "enabled",
    extraOptionsEnabled: process.env.FEATURE_FLAG_EXTRA_OPTIONS_ENABLED === "true"
  }

  return (
    <html lang="ro">
      <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
      <body>
        <AppRouterCacheProvider>
          {pathname && susiPaths.includes(pathname) ? 
            <>{children}</> : 
            <ClientLayout 
              signOutUrl={b2cFederatedLogoutUrl} 
              apiUrl={process.env.GRAPHQL_API_URL!} 
              cookieConsent={cookieConsent}
              featureFlags={featureFlags}
            >
              {children}
            </ClientLayout>
          }
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};
export default RootLayout;
