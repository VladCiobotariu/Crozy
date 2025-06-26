import React from "react";
import { CircularProgress, AppBar as MUIAppBar, styled } from "@mui/material";
import { Box, IconButton, Toolbar, Typography } from "../../atoms";
import { Menu } from "../../atoms/icons";
import { drawerWidth } from "../drawer/Drawer";
import { AppBarProfile } from "../../moleculas";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type AppBarProps = {
  open?: boolean;
  title?: string;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
  signouturl: string;
  toggleDrawer?: () => void;
};

const StyledAppBar = styled(MUIAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AppBar = ({ open, title, position, signouturl, toggleDrawer }: AppBarProps) => {
  
  const { data: session, status } = useSession(); 
  
  const headerButton = (status === "authenticated") && (
    <AppBarProfile user={session.user} signouturl={signouturl} />
  );
    
  return (
    <StyledAppBar open={open} position={position} signouturl={signouturl}>
      <Toolbar>
        <IconButton
          onClick={toggleDrawer}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Link href="/" style={{textDecoration: "none"}}>
          <Typography
              variant="b6_caption"
              component="div"
              sx={{
                cursor: "pointer", 
                color: "white",
                fontSize: "1rem",
              }}
          >
            {title}
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <React.Fragment>{headerButton}</React.Fragment>
      </Toolbar>
    </StyledAppBar>
  );
};
