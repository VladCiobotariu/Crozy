import React from "react";
import { Box, IconButton, Menu as MUIMenu, MenuItem } from "@mui/material";
import { Button } from "./Button";

export type OptionProps = {
  label: string;
  key: any;
  disabled?: boolean;
  icon?: React.ReactElement | React.ReactElement[];
};

type MenuProps = {
  children: React.ReactElement | React.ReactElement[];
  options?: Array<OptionProps>;
  onClick: (itemKey: any) => void;
  disabled?: boolean;
  iconButton?: boolean;
};

export const Menu = ({ children, options, onClick, disabled, iconButton }: MenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (itemKey: any) => {
    onClick(itemKey);
    handleClose();
  };

  return (
    <React.Fragment>
      {iconButton ? (
        <IconButton disabled={disabled} onClick={handleClick}>
          {children}
        </IconButton>
      ) : (
        <Button variant="text" disabled={disabled} onClick={handleClick} title={children} />
      )}
      <MUIMenu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        {options?.map((item: OptionProps) => (
          <MenuItem
            onClick={e => {
              handleItemClick(item.key);
              e.stopPropagation();
            }}
            disabled={item.disabled}
            key={item.key}
          >
            {item.icon} <Box className="MenuItemLabel">{item.label}</Box>
          </MenuItem>
        ))}
      </MUIMenu>
    </React.Fragment>
  );
};
