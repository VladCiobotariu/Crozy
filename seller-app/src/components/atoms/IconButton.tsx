import React from "react";
import { IconButton as MUIIconButton } from "@mui/material";

type IProps = {
  children: React.ReactNode | React.ReactNode[];
  color?:
    | "inherit"
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  disabled?: boolean;
  edge?: "start" | "end";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  sx?: Object;
};

export const IconButton = ({ children, color, disabled, edge, size, onClick, sx }: IProps) => (
  <MUIIconButton
    color={color}
    disabled={disabled}
    edge={edge}
    size={size}
    onClick={onClick}
    sx={sx}
  >
    {children}
  </MUIIconButton>
);
