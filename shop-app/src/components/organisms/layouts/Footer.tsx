import * as React from "react";
import Box, { BoxProps } from "@mui/joy/Box";

export const Footer = (props: BoxProps) => (
  <Box
    component="footer"
    className="Footer"
    {...props}
    sx={[
        {
          p: 2, gap: 2,
          bgcolor: "background.componentBg",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gridColumn: "1 / -1",
          borderTop: "1px solid",
          borderColor: "divider",
          bottom: 0,
        },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);
