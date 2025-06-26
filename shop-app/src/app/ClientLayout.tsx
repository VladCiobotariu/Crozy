"use client";
import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import theme from "@/utils/theme";

import { CssBaseline } from "@mui/joy";
import { AppBar } from "@/components/organisms";
import { BasketProvider } from "@/providers";
import { AlertProvider } from "@/providers/AlertProvider";
import { Header, Main, Root } from "@/components/organisms/layouts";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { createGraphQlClientForClientComponent } from "@/lib/apolloClientFactoryRCC";
import { Footer } from "@/components/organisms/layouts/Footer";
import FooterContent from "@/components/organisms/footer/FooterContent";
import CookieConsent from "@/components/organisms/modals/CookieConsent";
import { storeCookieConsent } from "@/cookies/cookiePolicyService";
import { FeatureFlags } from "./feature-flags";
import { FeatureFlagsProvider } from "@/providers/FeatureFlagsProvider";

type ClientLayoutProps = {
  signOutUrl: string;
  children: React.ReactNode;
  apiUrl: string;
  cookieConsent: boolean | undefined;
  featureFlags: FeatureFlags;
};

const ClientLayout = ({
  children,
  signOutUrl,
  apiUrl,
  cookieConsent,
  featureFlags,
}: ClientLayoutProps) => {
  const client = createGraphQlClientForClientComponent({ apiUrl });
  return (
    <SessionProvider>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <FeatureFlagsProvider featureFlags={featureFlags}>
          <ApolloProvider client={client}>
            <CssBaseline />
            <BasketProvider featureFlagForShowingCardPayment={featureFlags.cardPaymentEnabled}>
              <AlertProvider>
                <Root>
                  <Header>
                    <AppBar signOutUrl={signOutUrl} />
                  </Header>
                  <Main>{children}</Main>
                  <Footer>
                    <FooterContent />
                  </Footer>
                  {cookieConsent === undefined && (
                    <CookieConsent
                      onClickAccept={() => storeCookieConsent({ cookieConsent: true })}
                      onClickReject={() => storeCookieConsent({ cookieConsent: false })}
                    />
                  )}
                </Root>
              </AlertProvider>
            </BasketProvider>
          </ApolloProvider>
        </FeatureFlagsProvider>
      </CssVarsProvider>
    </SessionProvider>
  );
};

export default ClientLayout;
