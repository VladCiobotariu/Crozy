import { GET as authGET, POST as authPOST } from "@/app/auth";
import { NextRequest, NextResponse as NextResponseType } from 'next/server';
import { NextResponse } from 'next/server';

function customHandlerGet(req: NextRequest) {
  const b2cPasswordResetCancelErrorCode = "AADB2C90091";
  const errorDescription = req.nextUrl.searchParams.get("error_description");

  if (errorDescription && errorDescription.includes(b2cPasswordResetCancelErrorCode)) {
    return Response.redirect(process.env.NEXTAUTH_URL!)
  }

  return authGET(new NextRequest(req.url, req))
}

function customHandlerPost(req: NextRequest) {
    if (req.method === 'POST' && req.nextUrl.pathname === '/api/auth/session') {
      return NextResponse.json(
        { message: "Method not allowed." },
        { status: 405 }
      );
    }
  
    return authPOST(new NextRequest(req.url, req))
  }

export { customHandlerGet as GET, customHandlerPost as POST }