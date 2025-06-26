import { FragmentType, graphql, useFragment } from "@/gql";
import TotalItemPrice from "@moleculas/TotalItemPrice";
import TotalItemQuantity from "@moleculas/TotalItemQuantity";
import { Box, Sheet } from "@mui/joy";
import React from "react";
import ProductOrderItem from "./ProductOrderItem";
import { OrderItem } from "@/providers/BasketProvider";
import ExtraOptionsNames from "@moleculas/order-summary/ExtraOptionsName";

type OrderItemsProps = {
  orderItems: OrderItem[];
};

const OrderItemList = ({ orderItems }: OrderItemsProps) => {

  return (
    <>
      {orderItems.map(item => (
        <Sheet
          key={item.id}
          sx={theme => ({
            display: "grid",
            rowGap: theme.spacing(1),
            columnGap: theme.spacing(2),
            gridTemplateColumns: "1fr 8fr 1fr 1fr",
            gridTemplateAreas: `
                    "image title quantity price"
                    "image extras quantity price"
                  `,
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "1fr 4fr 1fr 1fr",
              gridTemplateAreas: `
                    "image title price price"
                    "image extras quantity quantity"
                  `,
            },
            [theme.breakpoints.down("sm")]: {
              gridTemplateColumns: "1fr 2fr 2fr",
              gridTemplateAreas: `
                    "image title title "
                    "image extras extras"
                    "image price quantity"
                  `,
            },
            alignItems: "center",
            justifyItems: "center",
          })}
        >
          {item.product?.id && (
            <>
              <ProductOrderItem
                product={{ ...item.product, image: item.product?.image?.url }}
                imageUrl={item.image?.url}
                productName={item.productName}
              />
              <Box
                sx={theme => ({
                  gridArea: "quantity",
                  [theme.breakpoints.down("md")]: {
                    justifySelf: "right",
                    alignSelf: "start",
                  },
                  [theme.breakpoints.down("sm")]: {
                    justifySelf: "self-end",
                    alignSelf: "end",
                  },
                })}
              >
                <TotalItemQuantity quantity={item.quantity} />
              </Box>
              <Box
                sx={theme => ({
                  gridArea: "extras",
                  justifySelf: "self-start",
                  alignSelf: "self-start",
                })}
              >
                <ExtraOptionsNames productExtraOptions={item.extraOptions.map(x=>{return {...x, id: x.extraOptionId ? x.extraOptionId : window.crypto.randomUUID()}})}/>
              </Box>
              <Box
                sx={theme => ({
                  gridArea: "price",
                  justifySelf: "right",
                  [theme.breakpoints.down("md")]: {
                    justifySelf: "right",
                    alignSelf: "end",
                  },
                  [theme.breakpoints.down("sm")]: {
                    justifySelf: "left",
                  },
                })}
              >
                <TotalItemPrice dislayTotalText={false} totalPrice={item.orderItemTotalPrice} />
              </Box>
            </>
          )}
        </Sheet>
      ))}
    </>
  );
};

export default OrderItemList;
