"use client";

import OrderStatusIcon from "@atoms/order-history/OrderStatusIcon";
import { Box, Typography } from "@mui/joy";
import React from "react";
import OrderDetailsComponent from "../order-history/OrderDetailsComponent";
import { FragmentType, graphql, useFragment } from "@/gql";
import dayjs from "dayjs";

export const OrderByIdDetailsFragment = graphql(/* GraphQL */ `
  fragment OrderByIdDetails on Order {
    id
    number
    totalPrice {
      amount
      currency
    }
    orderDateTime
    stateDescription {
      orderState
      stateChangeDescription
    }
    items {
      nodes {
        id
        image {
          url
        }
        extraOptions {
          extraOptionId
          price {
            amount
            currency
          }
          name
        }
        orderItemTotalPrice {
          currency
          amount
        }
        product {
          id
          name
          image {
            url
          }
          price {
            amount
            currency
          }
          slug
          description
          siteId
          siteSummary {
            name
            slug
          }
          extraOptions {
            category{
              id
              name
            }
            extraOptionCategoryId
            price {
              amount
              currency
            }
            id
            name
          }
          categories {
            name
            slug
          }
        }
        productDescription
        productName
        productPrice {
          amount
          currency
        }
        quantity
        productId
      }
    }
  }
`);

type OrderItemPageProps = {
    order: FragmentType<typeof OrderByIdDetailsFragment>;
}

const OrderItemPage = (props: OrderItemPageProps) => {

    const order = useFragment(OrderByIdDetailsFragment, props.order);
    const unparsedDate = order?.orderDateTime;
    const parsedDate = dayjs(unparsedDate).format('D MMM YYYY, H:mm');

    return (
        <Box sx={theme => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(4),
        })}>
          <Box
            sx={theme => ({
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(1),
            })}
          >
            <Box>
              <Typography level="h4" sx={{display: "inline"}}>
                Comanda:{" "}
              </Typography>
              <Typography level="h4" sx={{display: "inline"}}>
                {order.number}
              </Typography>
            </Box>
            <Box sx={theme=>({mt: theme.spacing(2)})}>
              <Typography level="title-sm" sx={{display: "inline"}}>
                Data:{" "}
              </Typography>
              <Typography level="title-sm" sx={{display: "inline"}}>
                {parsedDate}
              </Typography>
            </Box>
            <Box sx={theme=>({
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1),
            })}>
              <Typography level="title-sm">
                Status:
              </Typography>
              {order &&
                <OrderStatusIcon orderStatus={order.stateDescription.orderState}/>
              }
            </Box>
            <Typography level="title-md" sx={theme=>({mt: theme.spacing(2)})}>Sumarul comenzii:</Typography>
          </Box>
          {order.items?.nodes &&
            <OrderDetailsComponent order={{...order, items: order.items.nodes}}/>
          }
        </Box> 
    );
};

export default OrderItemPage