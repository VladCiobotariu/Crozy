import { Currency as GraphQlCurrency, Money } from "@/gql/graphql";
import { Theme } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Box, SxProps } from "@mui/system";
import React from "react";

type CurrencyProps = {
  price: Money;
  textAlign?: "center" | "start" | "end";
  sx?: SxProps<Theme>;
  variant?: "normal" | "big";
  boldedPrice?: boolean;
};

export const convertCurrencyToDisplayedText = (currency: GraphQlCurrency) => {
  switch (currency) {
    case GraphQlCurrency.Ron:
      return "lei";
    default: throw Error(`Currency unnsuported: ${currency}`)
  }
};

const Currency = ({ price, boldedPrice = true, textAlign, variant = "normal", sx = [] }: CurrencyProps) => {
  const level = (() => {
    switch (variant) {
      case "normal":
        return "inherit";
      case "big":
        return "h3";
      default:
        throw new Error(`Unknown price variant value ${variant}`);
    }
  })();

  const currency = convertCurrencyToDisplayedText(price.currency)

  variant === "normal" ? "inherit" : "big";
  return (
    <>
    {price &&
      <Typography
        component="span"
        level={level}
        sx={[{ display: "inline", fontWeight: boldedPrice ? "bold" : "" }, ...(Array.isArray(sx) ? sx : [sx])]}
        textAlign={textAlign}
      >
        {price.amount.toFixed(2)} {currency}
      </Typography>
    }
    </>
  );
};

export default Currency;
