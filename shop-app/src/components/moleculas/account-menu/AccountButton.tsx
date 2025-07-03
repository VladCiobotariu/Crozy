import { Box, CircularProgress, IconButton, ListDivider, MenuItem, MenuList, Typography } from "@mui/joy";
import { signIn } from "next-auth/react";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { ClickAwayListener, Popper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountMenuItem from "./AccountMenuItem";
import { signOut, useSession } from "next-auth/react";
import LoginIcon from '@mui/icons-material/Login';
import Link from "next/link";

type AccountMenuItem = {
  displayName: string;
  link: string;
  icon: React.JSX.Element;
};

type AccountButtonProps = {
  signOutUrl: string;
};

const AccountButton = ({ signOutUrl }: AccountButtonProps) => {

  const { data, status } = useSession();
  
  const [open, setOpen] = React.useState(false);
  const handleClick = (event: any) => {
    setOpen(true);
  };

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key === "Escape") {
      if (buttonRef.current) {
        buttonRef.current?.focus();
      }
      setOpen(false);
    }
  };

  return (
    <Box>
      <IconButton
        variant="plain"
        onClick={handleClick}
        ref={buttonRef}
        aria-controls={"account-popup"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color="neutral"
      >
        <PermIdentityIcon />
      </IconButton>
      <Popper
        disablePortal={true}
        role={undefined}
        id="account-popup"
        open={open}
        anchorEl={buttonRef.current}
        sx={{ zIndex: 9999 }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList variant="outlined" onKeyDown={handleListKeyDown} sx={{ boxShadow: "md" }}>
            {status === "loading" ?
              <CircularProgress sx={{width: "60px", height: "40px"}} size="sm" thickness={2} /> : status === "authenticated" ?
              <>
                <MenuItem disabled>
                  <Box sx={theme=>({
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(1),
                  })}>
                    <Box sx={theme=>({

                    })}>
                      <Typography sx={{display: "inline", fontWeight: "600"}}>Nume:{" "}</Typography>
                      <Typography sx={{display: "inline"}}>{data.user.name}</Typography>
                    </Box>
                    <Box sx={theme=>({
                      whiteSpace: "nowrap"
                    })}>
                      <Typography sx={{display: "inline", fontWeight: "600"}}>Email:{" "}</Typography>
                      <Typography sx={{display: "inline"}}>{data.user.email}</Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <ListDivider/>
                <MenuItem component={Link} href="/orders/history" onClick={handleClose}>
                  <Box sx={theme=>({
                    flexDirection: "row",
                    display: "flex",
                    gap: theme.spacing(2),
                    whiteSpace: "nowrap",
                  })}>
                    <FormatListBulletedIcon />
                    Comenzile mele
                  </Box>
                </MenuItem>
                <ListDivider/>
                <MenuItem component="button" onClick={() => {
                  handleClose()
                  signOut({
                    callbackUrl: signOutUrl,
                    redirect: true,
                  })
                }}>
                  <Box
                    sx={theme => ({
                      alignItems: "center",
                      flexDirection: "row",
                      display: "flex",
                      gap: theme.spacing(1),
                    })}
                  >
                    <LogoutIcon />
                    Logout
                  </Box>
                </MenuItem>
              </> : status === "unauthenticated" ?
              <MenuItem component={"button"} onClick={() => {
                handleClose()
                signIn("azure-ad-b2c");
              }}>
                <Box
                  sx={theme => ({
                    alignItems: "center",
                    flexDirection: "row",
                    display: "flex",
                    gap: theme.spacing(1),
                  })}
                >
                  <LoginIcon/>
                  Autentificare
                </Box>
              </MenuItem> : <></>
            }
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default AccountButton;
