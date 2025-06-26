import { auth } from "@/app/auth";
import { storeInviteCode } from "@/invite/inviteService";
import { b2cFederatedLogoutUrl } from "@/lib/azureB2CUtils";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const authenticationResult = await auth()
  if (authenticationResult?.user) {
    return Response.redirect("/")
  }
  const inviteCode = request.nextUrl.searchParams.get("code");
  if(inviteCode){
    storeInviteCode({inviteCode: inviteCode})
  }
  return Response.redirect(b2cFederatedLogoutUrl);
}