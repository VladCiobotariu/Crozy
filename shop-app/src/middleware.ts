import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT, encode } from 'next-auth/jwt';

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
    })
    const refreshedTokens = await response.json();
    if(!response.ok) throw refreshedTokens;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refresh_token
    }
  } catch(error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
};

export const config = {
  matcher: ['/azure-b2c/:path+', '/orders/:path+']
};

const sessionCookie = process.env.NODE_ENV === "production"
  ? '__Secure-authjs.session-token'
  : 'authjs.session-token';

const secureCookie = process.env.NODE_ENV === "production" ? true : false;

const shouldUpdateToken = (token: JWT) => {
    if (Date.now() < (token.accessTokenExpires as number))
      return false;
    return true;
};

const middleware = async (req: NextRequest) => {

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  if(req.nextUrl.pathname === '/orders/last-order'){
    return NextResponse.next({request: {headers: headers}});
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    secureCookie: secureCookie,
    salt: sessionCookie,
  });

  if (!token) {
    if(req.nextUrl.pathname.startsWith('/orders')){
      const response = NextResponse.redirect(new URL('/azure-b2c/log-in-redirect', req.url));
      response.headers.set("x-current-path", req.nextUrl.pathname)
      req.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes(sessionCookie)) response.cookies.delete(cookie.name);
      });
      return response;
    }
    else {
      const response: NextResponse<unknown> = NextResponse.next({request: {headers: headers}});
      return response;
    }
  } else if(shouldUpdateToken(token)){
    const newToken = await refreshAccessToken(token);
    const newSessionToken = await encode({
      secret: process.env.NEXTAUTH_SECRET!,
      token: {
        ...token,
        ...newToken,
      },
      salt: sessionCookie,
    });
    req.cookies.set(sessionCookie, newSessionToken);
    const response = NextResponse.next({request: {headers: headers}});
    response.cookies.set(sessionCookie, newSessionToken, process.env.NODE_ENV === "production" ? {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
    } : {});
    return response;
  } 
  else {
    return NextResponse.next({request: {headers: headers}});
  }
};

export default middleware;