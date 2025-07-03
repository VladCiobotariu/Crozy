import NextAuth from "next-auth";
import AzureB2C, { AzureADB2CProfile } from "next-auth/providers/azure-ad-b2c";
import type { Account, NextAuthConfig, Profile, User } from "next-auth";
import { b2cHostUrl } from "@/lib/azureB2CUtils";
import { gql } from "@apollo/client";
import { createGraphQlClientForNodeJS } from "@/lib/apolloClientFactoryNodeJS";

function getRequiredVariable(name: string): string | undefined {
  const value = process.env[name];
  return value;
};

export const config: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    AzureB2C({
      tenantId: getRequiredVariable("AZURE_AD_B2C_TENANT_NAME"),
      clientId: getRequiredVariable("AZURE_AD_B2C_CLIENT_ID"),
      clientSecret: getRequiredVariable("AZURE_AD_B2C_CLIENT_SECRET"),
      primaryUserFlow: getRequiredVariable("AZURE_AD_B2C_PRIMARY_USER_FLOW"),
      profile: (profile) => {
        const newProfile = profile as AzureADB2CProfile & {given_name: string, family_name: string}
        return {
          ...newProfile,
          id: profile.sub,
          email: newProfile?.emails?.[0],
          name: `${newProfile.given_name} ${newProfile.family_name}`
        };
      },
      issuer: getRequiredVariable("AZURE_AD_B2C_ISSUER_URL"),
      authorization: {
        url: getRequiredVariable("AZURE_AD_B2C_AUTHORIZATION_URL"),
        params: {
          scope: `${getRequiredVariable("AZURE_AD_B2C_AUTH_PARAMS_SCOPE_URL")} openid offline_access`,
        },
      },
      token: {
        url: getRequiredVariable("AZURE_AD_B2C_TOKEN_URL"),
      },
      jwks_endpoint: {
        url: getRequiredVariable("AZURE_AD_B2C_JWKS_ENDPOINT"),
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, profile, account, user }) => {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at! * 1000;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      return { ...session, token: token.accessToken };
    },
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      if (new URL(url).origin === b2cHostUrl) return url;

      return baseUrl;
    },
  },
  secret: getRequiredVariable("AUTH_SECRET"),
  session: {
    strategy: "jwt",
  },
  events: {
    signIn(message) {
      onSignInBuyer(message);
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

type OnUserSigninResult = {
  onBuyerSignIn: {
    buyer: {
      userId: string;
      id: string;
    };
    errors: {
      code: string;
      message: string;
    } | null; 
  } | null;
};


const addBuyerMutation = gql`
  mutation {
    onBuyerSignIn {
      errors {
        code
        message
      }
      buyer {
        userId
        id
      }
    }
  }
`;

const onSignInBuyer = async (message: {
  user: User;
  account: Account | null;
  profile?: Profile;
  isNewUser?: boolean;
}) => {
  
  const accessToken = message.account?.access_token;
  const client = createGraphQlClientForNodeJS({ accessToken });
  const result = await client.mutate<OnUserSigninResult>({
    mutation: addBuyerMutation,
  });

  const onBuyerSignInData = result?.data?.onBuyerSignIn;
  if(onBuyerSignInData?.buyer) {
    console.log("User signed in successfully!")
  }
  if(onBuyerSignInData?.errors) {
    console.error("Errors", onBuyerSignInData.errors);
  }
};

