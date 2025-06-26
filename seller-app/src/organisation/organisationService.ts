"use server"

import { cookies } from "next/headers";

const ORGANISATION_ID_COOKIE_NAME = "organisation-id";

export const storeOrganisationId = async ({ organisationId }: { organisationId: string }): Promise<void> => {
  cookies().set(ORGANISATION_ID_COOKIE_NAME, organisationId);
};

export const getOrganisationId = async (): Promise<string | undefined> => {
  const organisationIdCookie = cookies().get(ORGANISATION_ID_COOKIE_NAME);
  return organisationIdCookie?.value;
};

export const clearOrganisationId = async (): Promise<void> => {
  if(process.env.NODE_ENV === 'production'){
    cookies().set(ORGANISATION_ID_COOKIE_NAME, "" , {maxAge: 0});
  } else {
    cookies().delete(ORGANISATION_ID_COOKIE_NAME);
  }
};