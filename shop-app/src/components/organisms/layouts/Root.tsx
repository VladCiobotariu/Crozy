import * as React from "react";
import Box, { BoxProps } from "@mui/joy/Box";

export const Root = (props: BoxProps) => (
  <Box
    {...props}
    sx={[
      {
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.appBody",
        minHeight: "100vh",
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  >
    {/* preload not working as expected, hased values loaded before non hashed, please see https://stackoverflow.com/questions/63023946/preload-custom-font-with-next-js */}
    {/* <link rel="preload" href="/static/Hubot-Sans.woff2" as="font" type="font/woff2" crossOrigin="" />  */}
    {props.children}
  </Box>
);

export default Root;
