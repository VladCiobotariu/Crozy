import * as React from "react";
import Box, { BoxProps } from "@mui/joy/Box";

export const Main = (props: BoxProps) => (
  <Box
    component="main"
    className="Main"
    {...props}
    sx={[
      {
        flexGrow: "1",
        paddingTop: {
          xs: 4,
          sm: 4,
          md: 8,
          lg: 8,
          xl: 8,
        },
        paddingBottom: 8,
        margin: "auto",
        width: {
          sm: "90%",
          xs: "90%",
        },
        maxWidth: "lg",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);
