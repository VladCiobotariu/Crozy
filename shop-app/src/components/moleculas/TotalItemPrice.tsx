import { Money } from "@/gql/graphql";
import Currency from "@atoms/Currency";
import { Box, Typography } from "@mui/joy";
import React from "react";

export type TotalItemPriceProps = {
  totalPrice: Money;
  level?: "h1" | "h2" | "h3" | "h4" | "body-lg" | "body-md" | "body-sm" | "body-xs" | "title-lg" | "title-md" | "title-sm";
  boldedPrice?: boolean;
  dislayTotalText?: boolean;
};

const TotalItemPrice = ({ dislayTotalText = true, totalPrice, level = "body-md", boldedPrice = true }: TotalItemPriceProps) => {
  return (
    <Typography level={level}>
      {dislayTotalText &&
        <Box component="span" sx={{ display: "inline" }}>
          Total:{" "}
        </Box>
      }
      <Currency price={totalPrice} textAlign="center" boldedPrice={boldedPrice} />
    </Typography>
  );
};

export default TotalItemPrice;
