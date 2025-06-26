import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string;
      email?: string;
    };
    token;
    error?: "RefreshAccessTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError" | "RefreshTokenExpired";
  }
}
