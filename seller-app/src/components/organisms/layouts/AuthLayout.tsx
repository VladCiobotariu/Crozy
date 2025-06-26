"use client"
import React, { useEffect, useState } from "react";
import { Box, DrawerHeader } from "../../atoms";
import { AppBar } from "../../organisms";
import { Drawer } from "../drawer/Drawer";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

interface AuthLayoutProps {
  children: React.JSX.Element[] | React.JSX.Element | React.ReactNode;
  signouturl: string;
}

export const AuthLayout = ({ children, signouturl }: AuthLayoutProps) => {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!smallScreen);

  useEffect(() => {
    setOpen(!smallScreen);
  }, [smallScreen]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar toggleDrawer={() => setOpen(!open)} open={open} signouturl={signouturl} title="Delivery Admin" />
      <Drawer open={open} toggleDrawer={() => setOpen(!open)} />
      <Box component="main" sx={{ flexGrow: 1, padding: 5 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
export default AuthLayout;
