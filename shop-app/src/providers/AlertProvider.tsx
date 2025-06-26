import CustomizedAlert from "@moleculas/CustomizedAlert";
import { ColorPaletteProp } from "@mui/joy";
import React, { createContext, useContext, useState } from "react";

type AlertProviderProps = {
  children: React.ReactNode;
};

type InitialState = {
  pushAlert: (alert: AlertState) => void;
  clearAlert: () => void;
};

const initialState: InitialState = {
  pushAlert: () => {},
  clearAlert: () => {},
};

export type AlertState = {
  type: ColorPaletteProp;
  title: string;
  paragraph: string;
};

const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const pushAlert = (alert: AlertState) => {
    setAlert(alert);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider
      value={{
        pushAlert,
        clearAlert,
      }}
    >
      {!!alert && (
        <CustomizedAlert paragraph={alert.paragraph} title={alert.title} type={alert.type} />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
