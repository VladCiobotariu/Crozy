import { Box, IconButton, ListDivider, MenuItem, MenuList } from "@mui/joy";
import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { ClickAwayListener, Popper } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountMenuItem from "./AccountMenuItem";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type AccountMenuItem = {
  displayName: string;
  link: string;
  icon: React.JSX.Element;
};

const items: AccountMenuItem[] = [
  { displayName: "Comenzile mele", link: "/orders/history", icon: <FormatListBulletedIcon /> },
];

type AccountButtonProps = {
  signOutUrl: string;
};

const AccountButton = ({ signOutUrl }: AccountButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
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
        role={undefined}
        id="account-popup"
        open={open}
        anchorEl={buttonRef.current}
        sx={{ zIndex: 9999 }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList variant="outlined" onKeyDown={handleListKeyDown} sx={{ boxShadow: "md" }}>
            {items.map(item => (
              <React.Fragment key={`acount-fragment-${item.displayName}`}>
                <MenuItem sx={theme => ({ padding: theme.spacing(1, 1) })}>
                  <AccountMenuItem
                    handleClick={handleClose}
                    link={item.link}
                    displayName={item.displayName}
                    icon={item.icon}
                  />
                </MenuItem>
                <ListDivider key={`divider-item-${item.displayName}`} />

                <MenuItem>
                  <Box
                    onClick={() =>
                      signOut({
                        callbackUrl: signOutUrl,
                        redirect: true,
                      })
                    }
                    sx={theme => ({
                      flexDirection: "row",
                      display: "flex",
                      gap: theme.spacing(2),
                    })}
                  >
                    <LogoutIcon />
                    Logout
                  </Box>
                </MenuItem>
              </React.Fragment>
            ))}
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default AccountButton;
