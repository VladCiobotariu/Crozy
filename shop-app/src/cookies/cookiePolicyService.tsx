"use server"

import { cookies } from "next/headers";

const COOKIE_CONSENT_COOKIE_NAME = "CookieConsent";

export const storeCookieConsent = async ({ cookieConsent }: { cookieConsent: boolean }): Promise<void> => {
  cookies().set(COOKIE_CONSENT_COOKIE_NAME, JSON.stringify(cookieConsent), {expires: new Date().setFullYear(new Date().getFullYear() + 1)});
};

export const getCookieConsent = async (): Promise<boolean | undefined> => {
  const cookieConsentCookie = cookies().get(COOKIE_CONSENT_COOKIE_NAME);

  if(!cookieConsentCookie?.value) return undefined;

  const value = JSON.parse(cookieConsentCookie?.value);
  if(typeof value === "boolean") return value;
  else return undefined;
};