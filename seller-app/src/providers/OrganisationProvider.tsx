"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { Exact, GetMySellerQuery, Role, SellerState, useGetMySellerLazyQuery, useGetMySellerQuery } from "../generated/graphql";
import CircularProgress from '@mui/material/CircularProgress';
import { QueryResult } from "@apollo/client";
import { Box } from "@mui/system";
import { storeOrganisationId } from "@/organisation/organisationService";

type OrganisationProviderProps = {
  children: React.ReactNode;
  cookieStorageOrganisationId: string | undefined;
};
 
type InitialState = {
  organisationId: string | undefined;
  organisationName: string | null;
  organisationRole: Role | null;
  loadingUserQuery: boolean
  hasMultipleOrganisations: boolean 
  setOrganisationId: (value: string) => void
};
  
const initialState: InitialState = {
  hasMultipleOrganisations: false,
  loadingUserQuery: true,
  organisationId: "",
  organisationRole: null,
  organisationName: null,
  setOrganisationId: (value: string) => {},
};

export const convertRoleToDisplayValue = (role: Role) => {
  switch (role) {
    case Role.Admin:
      return "Admin";
    case Role.Owner:
      return "Owner";
    case Role.Seller:
      return "Seller";
    default: throw Error("Role should be Owner, Admin or Seller.")
  }
};

export const convertSellerStateToDisplayValue = (state: SellerState) => {
  switch (state) {
    case SellerState.Active:
      return "Active";
    case SellerState.Disabled:
      return "Disabled";
    case SellerState.InvitationPending:
      return "Pending";
      default: throw Error("SellerState should be Active, Disabled or InvitationPending.")
  }
};

const OrganisationContext = createContext(initialState);

export const OrganisationProvider = ({ children, cookieStorageOrganisationId }: OrganisationProviderProps) => {

  const [getMySeller, {data: sellerData, loading: userLoading}] = useGetMySellerLazyQuery();

  const [hasMultipleOrganisations, setHasMultipleOrganisations] = useState<boolean>(false);
  const [organisationRole, setOrganisationRole] = useState<Role | null>(null);
  const [organisationName, setOrganisationName] = useState<string | null>(null);

  const setSellerData = (data: QueryResult<GetMySellerQuery, Exact<{[key: string]: never;}>>) => {
    const seller = data.data?.mySeller.seller;
    setHasMultipleOrganisations((seller?.user && seller.user.sellers.length > 1) ?? false);
    setOrganisationRole(seller?.role ?? null);
    setOrganisationName(seller?.organisation.name ?? null);
  }

  useEffect(()=>{
    // branch for when we refresh page and use states are null, we check it with seller
    if(!!cookieStorageOrganisationId){
      getMySeller({fetchPolicy: "network-only"}).then(res=>{
        setSellerData(res);
      })
    }
    // branch for when cookie is not present
    if(!cookieStorageOrganisationId){
      getMySeller().then(res=>{
        const seller = res.data?.mySeller.seller;
        if(seller){
          storeOrganisationId({organisationId: seller?.organisation.id});
        }
        setSellerData(res);
      })
    }
  },[cookieStorageOrganisationId])

  const setOrganisationId = async (value: string) => {
    await storeOrganisationId({organisationId: value});
  }

  return (
    <OrganisationContext.Provider
      value={{
        loadingUserQuery: userLoading,
        organisationId: cookieStorageOrganisationId,
        organisationName,
        organisationRole,
        setOrganisationId,
        hasMultipleOrganisations,
      }}
    >
      {cookieStorageOrganisationId ?
        children :
        <Box sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <CircularProgress/>
        </Box>
      }
    </OrganisationContext.Provider>
  );
}

export const useOrganisation = () => useContext(OrganisationContext);