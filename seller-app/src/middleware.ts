import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT, encode } from 'next-auth/jwt';

const refreshTokenExpiredError = 'AADB2C90080'

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const url = `${process.env.AZURE_AD_B2C_TOKEN_URL}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.AZURE_AD_B2C_CLIENT_ID!,
        client_secret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      })
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };
  } catch (err) {
    const error = err as {error: string, error_description: string}
    const error_description = error.error_description
    console.log(error);
    if (error_description && error_description.includes(refreshTokenExpiredError)) {
      return {
        ...token,
        error: "RefreshTokenExpired",
      };
    }
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

const sessionCookie = process.env.NODE_ENV === "production"
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';

const secureCookie = process.env.NODE_ENV === "production" ? true : false;

const shouldUpdateToken = (token: JWT) => {
  if (Date.now() < (token.accessTokenExpires as number))
    return false;
  return true;
}

const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req: req,
    secret: process.env.AUTH_SECRET!,
    secureCookie: secureCookie,
    salt: sessionCookie,
  });
  if (req.nextUrl.pathname === '/seller/invitations'){
    const response: NextResponse<unknown> = NextResponse.next();
    return response;
  }
  if (!token) {
    if(req.nextUrl.pathname !== "/azure-b2c/log-in"){
      const response = NextResponse.redirect(new URL('/azure-b2c/log-in', req.url));
      req.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes(sessionCookie)) response.cookies.delete(cookie.name);
      });
      return response;
    }
    else{
      const response: NextResponse<unknown> = NextResponse.next();
      return response;
    }
  } else if(shouldUpdateToken(token)){
    const newToken = await refreshAccessToken(token);
    if(newToken.error === "RefreshTokenExpired"){
      if(req.nextUrl.pathname !== "/azure-b2c/log-in"){
        const response = NextResponse.redirect(new URL('/azure-b2c/log-in', req.url))
        req.cookies.getAll().forEach((cookie) => {
          if (cookie.name.includes(sessionCookie)) response.cookies.delete(cookie.name);
        });
        return response;
      }
      else{
        const response: NextResponse<unknown> = NextResponse.next();
        return response;
      }
    }
    const newSessionToken = await encode({
      secret: process.env.AUTH_SECRET!,
      token: {
        ...token,
        ...newToken,
      },
      salt: sessionCookie,
    });
    req.cookies.set(sessionCookie, newSessionToken);
    const response = NextResponse.next();
    response.cookies.set(sessionCookie, newSessionToken, process.env.NODE_ENV === "production" ? {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
    } : {});
    return response;
  } 
  else {
    return NextResponse.next();
  }
};

export default middleware;
