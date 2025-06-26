import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { useOrganisation } from "../../providers/OrganisationProvider";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

type AppBarProfileProps = {
  user: User;
  signouturl: string;
}

export const AppBarProfile = ({user, signouturl}: AppBarProfileProps) => {

  const { hasMultipleOrganisations, organisationName} = useOrganisation();
    
  const handleClick = async () => {
    setAnchorElUser(null);
    await signOut({
      callbackUrl: signouturl,
      redirect: true,
    });
  };

  const handleClickSwitchOrganisation = () => {
    setAnchorElUser(null);
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="View profile settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={theme=>({
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          px: theme.spacing(2),
          gap: theme.spacing(1),
          mb: theme.spacing(1),
        })}>
          <Box>
            <Typography sx={{
              display: "inline",
              fontWeight: "600"
            }}>
              Organisation:{" "}
            </Typography>
            <Typography sx={{
              display: "inline",
            }}>
              {organisationName}
            </Typography>
          </Box>
          <Typography>
            {user.email}
          </Typography>
          <Box sx={theme=>({
            display: "flex",
            flexDirection: "row",
            mt: theme.spacing(1),
            gap: theme.spacing(1),
          })}>
            <Button variant="contained" onClick={() => handleClick()}>
              Logout
            </Button>
            {hasMultipleOrganisations &&
              <Link href={"/profile/switch-organisation"}>
                <Button onClick={handleClickSwitchOrganisation}>
                  Switch organisation
                </Button>
              </Link>
            }
          </Box>
        </Box>
      </Menu>
    </>
  );
};
