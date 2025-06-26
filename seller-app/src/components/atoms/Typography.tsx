import { Typography as MuiTypography } from "@mui/material";
import React, { ElementType } from "react";

type TypographyProps = {
  children: string | React.ReactNode | React.ReactNode[];
  variant?:
    | "b1_title"
    | "b2_heading"
    | "b3_subhead"
    | "b4_body"
    | "b4_body_bold"
    | "b5_caption"
    | "b5_regular"
    | "b6_micro"
    | "b4_caption"
    | "b6_caption";
  component?: ElementType;
  sx?: Object;
};

const toVariant = (
  variant?:
    | "b1_title"
    | "b2_heading"
    | "b3_subhead"
    | "b4_body"
    | "b4_body_bold"
    | "b5_caption"
    | "b5_regular"
    | "b6_micro"
    | "b4_caption"
    | "b6_caption"
):
  | "h1"
  | "h2"
  | "h3"
  | "h5"
  | "body1"
  | "caption"
  | "body2"
  | "body1_bold"
  | "subtitle1"
  | "subtitle2" => {
  switch (variant) {
    case "b1_title":
      return "h1";
    case "b2_heading":
      return "h2";
    case "b3_subhead":
      return "h3";
    case "b4_body":
      return "body1";
    case "b5_caption":
      return "caption";
    case "b6_micro":
      return "body2";
    case "b4_body_bold":
      return "body1_bold";
    case "b5_regular":
      return "h5";
    case "b4_caption":
      return "subtitle1";
    case "b6_caption":
      return "subtitle2";
    default:
      return "body1";
  }
};

export const Typography = ({ component, variant, children, sx }: TypographyProps) => {
  const customVariant = toVariant(variant);
  return (
    <MuiTypography
      {...(customVariant !== "body1_bold" && { variant: customVariant })}
      {...(component ? { component: component } : {})}
      sx={sx}
    >
      {children}
    </MuiTypography>
  );
};
