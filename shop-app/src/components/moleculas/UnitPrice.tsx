import { Money } from "@/gql/graphql";
import Currency from "@atoms/Currency";
import { Box, Typography, useTheme } from "@mui/joy";
import { Theme } from "@mui/joy";
import { SxProps } from "@mui/system";
import React from "react";

export type UnitPriceProps = {
  price: Money;
  sx?: SxProps<Theme>;
};

const UnitPrice = ({ price, sx }: UnitPriceProps) => {
  return (
    <Box>
      <Typography component="span" sx={[{ display: "inline" }, ...(Array.isArray(sx) ? sx : [sx])]}>
        Preț:{" "}
      </Typography>
      <Currency price={price} textAlign="center" sx={sx}/>
    </Box>
  );
};

export default UnitPrice;
