"use client";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Link from "next/link";
import React from "react";
import { useBasket } from "../../../providers";
import ShoppingCartItem from "./ShoppingCartItem";
import { Typography, useTheme } from "@mui/joy";
import EmptyShoppingCart from "./EmptyAlert";
import { createQueryString } from "@/services/queryService";
import TotalItemPrice from "@moleculas/TotalItemPrice";
import { Currency, Money } from "@/gql/graphql";

const ShoppingCart = () => {
  const theme = useTheme();
  const { items, siteId, total } = useBasket();

  return (
    <>
      <Typography level="h3">
        Produse în coș
      </Typography>

      {items.length !== 0 ? (
        <>
          <Box sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            {items && items.map(item => <ShoppingCartItem key={`item-${item.guid}`} item={item} />)}
          </Box>
          <Box
            sx={{
              textAlign: "right",
              padding: theme.spacing(2, 0, 2, 0),
            }}
          >
            <TotalItemPrice level={"h3"} boldedPrice={false} totalPrice={total}/>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            {siteId && (
              <Link href={`/checkout/address?${createQueryString("siteId", siteId)}`}>
                <Button>Pasul următor</Button>
              </Link>
            )}
          </Box>
        </>
      ) : (
        <EmptyShoppingCart 
          link="/" 
          highlightedText="la magazin." 
          text="Coșul tău de cumpărături este gol! Pentru a adăuga produse în coș te rugam să te întorci"
        />
      )}
    </>
  );
};

export default ShoppingCart;
