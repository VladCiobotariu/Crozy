import React from "react";
import { Box as MUIBox } from "@mui/material";

type IProps = {
  children?: React.ReactElement | React.ReactElement[] | React.ReactNode | React.ReactNode[];
  sx?: Object;
  component?: React.ElementType;
  maxWidth?: string;
  width?: number;
};

export const Box = ({ children, sx, component, maxWidth, width }: IProps) => (
  <MUIBox maxWidth={maxWidth} width={width} component={component} sx={sx}>
    {children}
  </MUIBox>
);
