import { Box, Theme, Typography } from "@mui/joy";
import { SxProps } from "@mui/system";
import React from "react";

export type TotalItemQuantityProps = {
  quantity: number;
  sx?: SxProps<Theme>;
  level?: "h1" | "h2" | "h3" | "h4" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "title-lg" | "title-md" | "title-sm";
  variant?: "2digit" | "1digit";
}

const TotalItemQuantity = ({ quantity, sx = [], level = "body-md", variant = "2digit" }: TotalItemQuantityProps) => {
  return (
    <Box>
      <Typography
        level={level}
        sx={[{ 
          width: variant==="2digit" ? "2ch" : "fit-content", 
          display: "inline-block", 
          textAlign: "right" 
        }, ...(Array.isArray(sx) ? sx : [sx])]}
        component="span"
      >
        {quantity}
      </Typography>
      <Typography sx={{ display: "inline-block" }} component="span">
        &nbsp;
      </Typography>
      <Typography 
        level={level}
        sx={[{ display: "inline-block" }, ...(Array.isArray(sx) ? sx : [sx])]}
        component="span"
      >
        Buc
      </Typography>
    </Box>
  );
};

export default TotalItemQuantity;
