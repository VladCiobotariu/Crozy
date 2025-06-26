import NextAuth from "next-auth";
import AzureB2C from "next-auth/providers/azure-ad-b2c";
import type { Account, NextAuthConfig, Profile, User } from "next-auth";
import { b2cHostUrl } from "@/lib/azureB2CUtils";
import { gql } from "@apollo/client";
import { createGraphQlClientForNodeJS } from "@/lib/apolloClientFactoryNodeJS";
import { clearInviteCode, getInviteCode } from "@/invite/inviteService";
import { clearOrganisationId, storeOrganisationId } from "@/organisation/organisationService";

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
    jwt: async ({ token, profile, account }) => {
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
  secret: getRequiredVariable("NEXTAUTH_SECRET"),
  session: {
    strategy: "jwt",
  },
  events: {
    async signIn(message) {
      const {organisationId} = await onSignIn(message);
      if(organisationId) {
        storeOrganisationId({ organisationId: organisationId })
      }
      clearInviteCode()
    },
    async signOut(message){
      await clearOrganisationId()
    },
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

type OnUserSignInResult = {
  onSellerSignIn: {
    seller: {
      userId: string;
      id: string;
      organisation: {
        name: string;
      }
      organisationId: string;
    };
    errors: {
      code: string;
      message: string;
    } | null; 
  } | null;
};

type OnAcceptInvitationResult = {
  acceptInvitation: {
    seller: {
      organisationId: string;
      id: string;
    };
    errors: {
      code: string;
      message: string;
    } | null;
  } | null;
};

type OnSignInData = {
  organisationId: string | undefined
}

const AddSellerMutation = gql`
  mutation {
    onSellerSignIn {
      seller {
        id
        userId
        organisation {
          name
        }
        organisationId
      }
      errors {
        message
        code
      }
    }
  }
`;

const OnAcceptInvitationMutation = gql`
  mutation AcceptInvitation($invitationCode: String!) {
    acceptInvitation(input: {invitationCode: $invitationCode}){
        seller{
          id
          organisationId
        }
        errors{
          code
          message
        }
    }
  }
`

const onSignIn = async (message: {
  user: User;
  account: Account | null;
  profile?: Profile;
  isNewUser?: boolean;
}) : Promise<OnSignInData> => {

  const accessToken = message.account?.access_token;
  const inviteCode = getInviteCode();
  let organisationId: string | undefined;
  if(!!inviteCode) {
    const client = createGraphQlClientForNodeJS({ accessToken });
    const result = await client.mutate<OnAcceptInvitationResult>({
      mutation: OnAcceptInvitationMutation,
      variables: {invitationCode: inviteCode }
    });
    const onAcceptInvitationData = result?.data?.acceptInvitation;
    console.log('Mutation errors', onAcceptInvitationData?.errors)
    if(onAcceptInvitationData) {
      organisationId = onAcceptInvitationData.seller.organisationId;
    }
  } else {
    const client = createGraphQlClientForNodeJS({ accessToken });
    const result = await client.mutate<OnUserSignInResult>({
      mutation: AddSellerMutation,
    });
    const onSellerSignInData = result?.data?.onSellerSignIn;
    if(onSellerSignInData?.seller) {
      console.log("User signed in successfully!");
      organisationId = onSellerSignInData.seller.organisationId;
    }
    if(onSellerSignInData?.errors) {
      console.error("Errors", onSellerSignInData.errors);
    }
  }

  return {organisationId: organisationId}
};
