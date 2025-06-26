"use client";

import React from "react";
import { Skeleton, Typography, Box } from "@mui/joy";
import { useBasket } from "@/providers";
import OrderDetailsComponent from "@/components/organisms/order-history/OrderDetailsComponent";

const LastOrderPage = () => {

  const { lastOrder } = useBasket();

  return lastOrder ? (
    <Box sx={theme => ({
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(4),
    })}
    >
      <Box sx={theme => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      })}
      >
        <Typography level="h4">Comanda cu numarul {lastOrder.number} a fost plasata cu success</Typography>
        <Typography level="title-md">Sumarul comenzii:</Typography>
      </Box>
      <OrderDetailsComponent order={lastOrder} />
    </Box>
  ) : (
    <Box sx={theme=>({
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(4),
    })}>

      <Box sx={theme => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      })}>

        <Typography level="h4">
          <Skeleton>
            Comanda cu numarul ON-000000 a fost plasata cu success
          </Skeleton>
        </Typography>

        <Typography level="title-md">
          <Skeleton>
            Sumarul comenzii:
          </Skeleton>
        </Typography>

      </Box>
    </Box>
  );
};

export default LastOrderPage;
