import React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { ShoppingBasketIcon } from "../../moleculas";
import Link from "next/link";
import { CircularProgress, IconButton, useTheme } from "@mui/joy";
import LoginButton from "./LoginButton";
import AccountButton from "../../moleculas/account-menu/AccountButton";
import { useSession } from "next-auth/react"
import Logo from "@atoms/Logo";

type AppBarProps = {
  signOutUrl: string;
};

export const AppBar = ({signOutUrl}: AppBarProps) => {
  const theme = useTheme();
  const { data: session, status } = useSession(); 

  const headerButton: React.JSX.Element | null = (() => {
    
    switch (status) {
      case "authenticated":
        return <AccountButton signOutUrl={signOutUrl} />;
      case "unauthenticated":
        return <LoginButton />;
      case "loading":
        return (
          <IconButton>
            <CircularProgress size="sm" thickness={2} />
          </IconButton>
        );
    }
  })();

  return (
      <Box
        sx={ theme => ({
          [theme.breakpoints.down('md')]: {
            maxHeight: "40px",
          },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
          maxWidth: "lg",
        })}
      >
        <Link href="/" style={{ textDecoration: "none", paddingLeft: theme.spacing(1)}}>
          <Logo/>
        </Link>
        <Box>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              s: 2,
            }}
          >
            <ListItem>
              {headerButton}
            </ListItem>
            <ListItem
              key="menu-item-shopping-basket-icon"
              sx={{ pr: theme.spacing(1) }} // Add spagin on right to avoid icon overlap on scale (when adding item to the basket)
            >
              <ShoppingBasketIcon key="app-bar-shopping-basket-icon" />
            </ListItem>
          </List>
        </Box>
      </Box>
  );
};
