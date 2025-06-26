import React from "react";
import { Toolbar as MUIToolbar } from "@mui/material";

type IProps = {
  children?: React.ReactElement | React.ReactElement[];
  variant?: "regular" | "dense";
  sx?: Object;
};

export const Toolbar = ({ children, variant, sx }: IProps) => (
  <MUIToolbar sx={sx} variant={variant}>
    {children}
  </MUIToolbar>
);
