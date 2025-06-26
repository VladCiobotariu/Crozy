import Currency from "@atoms/Currency";
import { Typography, Button } from "@mui/joy";
import Link from "next/link";
import { Box } from "@mui/system";
import { FragmentType, graphql, useFragment } from "@/gql";
import OrderItemList from "@/components/organisms/last-order/OrderItemList";
import React from "react";
import { Order } from "@/providers/BasketProvider";

type OrderDetailsComponentProps = {
  order: Order;
};

const OrderDetailsComponent = ({order}: OrderDetailsComponentProps) => {

  return (
    <>
      <Box sx={theme => ({
        display: "flex",
        flexDirection: "column",
        gap: {
          xs: 4,
          sm: 4,
          md: 6,
          lg: 6,
          xl: 6,
        },
      })}>
        <OrderItemList orderItems={order.items} />
      </Box>
      <Box
        sx={theme => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          alignItems: "end",
        })}
      >
        <Typography level="h3">
          Total: <Currency price={order.totalPrice} variant="big" />
        </Typography>
        <Link href="/">
          <Button>Mergi la pagina principala</Button>
        </Link>
      </Box>
    </>
  );
};

export default OrderDetailsComponent