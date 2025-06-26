import { BasketItem } from "@/providers";
import { Box, Divider, Typography, useTheme } from "@mui/joy";
import React from "react";
import OrderItemSlot from "../../organisms/order-history/OrderItemSlot";
import { useMediaQuery } from "@mui/system";

type OrderItemsSummaryProps = {
  orderItems: BasketItem[];
};

const OrderItemsSummary = ({ orderItems }: OrderItemsSummaryProps) => {
  const theme = useTheme();
  const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={theme => ({
        borderRadius: "10px",
        border: 1,
        borderColor: theme.vars.palette.divider,
      })}
    >
      <Typography
        level={isMediumSize ? "title-sm" : "title-md"}
        sx={theme => ({
          padding: {
            xs: theme.spacing(1.5),
            md: theme.spacing(2),
          },
        })}
      >
        Produsele din comandă
      </Typography>
      <Divider sx={{ mb: theme.spacing(1) }} />
      {orderItems.map((orderItem: BasketItem) => (
        <Box key={`${orderItem.guid}`}>
          <OrderItemSlot
            key={`${orderItem.guid}-list-item`}
            productId={orderItem.product.id}
            productExtraOptions={orderItem.extraOptions}
            productName={orderItem.product.name}
            totalProductPrice={orderItem.totalItemPrice}
            productImageUrl={orderItem.product.image}
            quantity={orderItem.quantity}
            productLink={`/${orderItem.product?.siteSummary.slug}/${orderItem.product?.slug}`}
            showBuyAgainButton={false}
          />
          {orderItems.at(orderItems.length - 1) !== orderItem && (
            <Divider
              key={`${orderItem.product.id}-divider`}
              sx={theme => ({ mb: theme.spacing(1) })}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default OrderItemsSummary;
