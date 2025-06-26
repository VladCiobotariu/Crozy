"use client";

import { PaymentType } from "@/gql/graphql";
import CustomerDetailsComponent from "@moleculas/order-summary/CustomerDetailsComponent";
import OrderItemsSummary from "@moleculas/order-summary/OrderItemsSummary";
import ShippingDetailsComponent from "@moleculas/order-summary/ShippingDetailsComponent";
import { useBasket } from "@/providers";
import { Box, Button, Link, Typography, useTheme } from "@mui/joy";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PaymentDetailsComponent from "@moleculas/order-summary/PaymentDetailsComponent";
import EmptyAlert from "@/components/organisms/shopping-cart/EmptyAlert";
import { createQueryString } from "@/services/queryService";
import Currency from "@atoms/Currency";

const OrderSummaryPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    items,
    orderSubmitting,
    deliveryAddress,
    customerDetails,
    total,
    paymentType,
    siteId,
    submit,
  } = useBasket();

  const [redirecting, setRedirecting] = useState<boolean>(false)

  const submitOrder = async () => {
    setRedirecting(true)
    const order = await submit();
    if (!order) {
      // TODO: show error because order was not returned
      return;
    }
    if (paymentType === PaymentType.Card) {
      router.push(`/payments?order=${order.id}`);
    } else {
      router.push("/orders/last-order");
    }
  };

  return (
    <Box
      sx={theme => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      })}
    >
      {!!customerDetails && !!deliveryAddress && (
        <>
          {items.length !== 0 ? (
            <>
              <Typography level="h4">Sumarul comenzii</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  justifyContent: "space-between",
                  [theme.breakpoints.down("md")]: {
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                  },
                }}
              >
                <ShippingDetailsComponent shippingDetails={deliveryAddress} />
                <CustomerDetailsComponent customerDetails={customerDetails} />
                <PaymentDetailsComponent paymentType={paymentType} />
              </Box>
              {siteId && (
                <Box>
                  <Link href={`/checkout/address?${createQueryString("siteId", siteId)}`}>
                    <Button variant="outlined">Modifică detaliile</Button>
                  </Link>
                </Box>
              )}
              <OrderItemsSummary orderItems={items} />
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button sx={{display: "inline"}} loading={orderSubmitting} onClick={submitOrder}>
                  Trimite comanda{" "}
                  <Currency price={total}/>
                </Button>
              </Box>
            </>
          ) : orderSubmitting || redirecting ? (
            <>Redirecționare...</>
          ) : (
            <EmptyAlert
              link="/"
              highlightedText="la magazin."
              text="Coșul tău de cumpărături este gol! Pentru a adăuga produse în coș te rugam să te întorci"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default OrderSummaryPage;
