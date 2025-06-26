import { cookies } from "next/headers";

const INVITE_CODE_COOKIE_NAME = "invite-code";

export const storeInviteCode = ({ inviteCode }: { inviteCode: string }): void => {
  cookies().set(INVITE_CODE_COOKIE_NAME, inviteCode);
};

export const getInviteCode = (): string | undefined => {
  const inviteCodeCookie = cookies().get(INVITE_CODE_COOKIE_NAME);
  return inviteCodeCookie?.value;
};

export const clearInviteCode = (): void => {
  if(process.env.NODE_ENV === 'production'){
    cookies().set(INVITE_CODE_COOKIE_NAME, "" , {maxAge: 0});
  } else {
    cookies().delete(INVITE_CODE_COOKIE_NAME);
  }
};