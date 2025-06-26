import { FeatureFlags } from "@/app/feature-flags";
import CustomizedAlert from "@moleculas/CustomizedAlert";
import { ColorPaletteProp } from "@mui/joy";
import React, { createContext, useContext, useState } from "react";

type FeatureFlagProviderProps = {
  children: React.ReactNode;
  featureFlags: FeatureFlags;
};

type InitialState = {
  flags: FeatureFlags;
};

const initialState: InitialState = {
  flags: {
    cardPaymentEnabled: false,
    extraOptionsEnabled: false,
  },
};

const FeatureFlagsContext = createContext(initialState);

export const FeatureFlagsProvider = ({ children, featureFlags }: FeatureFlagProviderProps) => {
  return (
    <FeatureFlagsContext.Provider
      value={{
        flags: featureFlags,
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagsContext);
