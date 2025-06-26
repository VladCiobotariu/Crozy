import OrderStatusIcon from "@atoms/order-history/OrderStatusIcon";
import {
  Accordion,
  accordionSummaryClasses,
  accordionDetailsClasses,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useTheme,
  Button,
  Tooltip,
  Divider,
} from "@mui/joy";
import { Box, useMediaQuery } from "@mui/system";
import { useRouter } from "next/navigation";
import OrderItemSlot from "./OrderItemSlot";
import dayjs from "dayjs";
import Currency from "@atoms/Currency";
import { FragmentType, graphql, useFragment } from "@/gql";

const OrderCardFieldsFragment = graphql(/* GraphQL */ `
  fragment OrderCardFields on Order {
    id
    number
    stateDescription {
      orderState
      stateChangeDescription
    }
    totalPrice {
      amount
      currency
    }
    orderDateTime
    paymentState {
      status
      type
    }
    items {
      nodes {
        id
        productId
        productName
        productPrice {
          amount
          currency
        }
        quantity
        orderItemTotalPrice {
          currency
          amount
        }
        extraOptions {
          extraOptionId
          price {
            amount
            currency
          }
          name
        }
        product {
          slug
          siteSummary {
            name
            slug
          }
        }
        productDescription
        image {
          url
        }
      }
    }
  }
`);

type OrderCardProps = {
  order: FragmentType<typeof OrderCardFieldsFragment>;
  isLast: boolean;
  isFirst: boolean;
};

const OrderCard = (props: OrderCardProps) => {
  const theme = useTheme();
  const isMediumSize = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const order = useFragment(OrderCardFieldsFragment, props.order);
  const { isLast, isFirst } = props;

  const unparsedDate = order.orderDateTime;
  const parsedDate = dayjs(unparsedDate).format("D MMM YYYY, H:mm");

  const handleOnClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    router.push(`/orders/${order.id}`);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Accordion
      sx={theme => ({
        borderBottom: isLast ? 0 : 1,
        borderColor: theme.vars.palette.divider,
        [`& .${accordionSummaryClasses.button}`]: {
          padding: theme.spacing(3),
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
          },
          cursor: "default",
        },
        [`& .${accordionSummaryClasses.button}:hover`]: {
          borderTopLeftRadius: isLast ? 0 : "10px",
          borderTopRightRadius: isLast ? 0 : "10px",
          borderBottomLeftRadius: isFirst ? 0 : "10px",
          borderBottomRightRadius: isFirst ? 0 : "10px",
          [`&.${accordionDetailsClasses.expanded}`]: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
        [`& .${accordionDetailsClasses.content}`]: {
          boxShadow: theme => `inset 0 1px ${theme.vars.palette.divider}`,
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlock: "0.75rem",
          },
        },
      })}
    >
      <AccordionSummary
        component={"div"}
        slotProps={{
          button: { component: "div" },
        }}
        sx={theme => ({
          [theme.breakpoints.down("sm")]: {
            columnGap: theme.spacing(1),
          },
        })}
      >
        <Box
          sx={theme => ({
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          })}
        >
          <Box
            sx={theme => ({
              display: "flex",
              flexDirection: "row",
              gap: theme.spacing(5),
              [theme.breakpoints.down("lg")]: {
                gap: theme.spacing(3),
              },
              [theme.breakpoints.down("sm")]: {
                gap: theme.spacing(2),
                flexDirection: "column",
              },
            })}
          >
            <Box
              sx={theme => ({
                display: "flex",
                flexDirection: "column",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "row",
                },
                gap: theme.spacing(1),
              })}
            >
              <Typography level="title-sm">{isMediumSize ? "Nr." : "Numărul comenzii"}</Typography>
              <Typography sx={{whiteSpace: "nowrap"}} level="body-md">{order.number}</Typography>
            </Box>
            {!isMediumSize && (
              <Box
                sx={theme => ({
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1),
                  minWidth: "152px",
                })}
              >
                <Typography level="title-sm">Data</Typography>
                <Typography level="body-md">{parsedDate}</Typography>
              </Box>
            )}
            <Box
              sx={theme => ({
                display: "flex",
                flexDirection: "column",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "row",
                },
                gap: theme.spacing(1),
                minWidth: "75px",
              })}
            >
              <Typography level="title-sm">Total</Typography>
              <Typography level="body-md">
                <Currency price={order.totalPrice} boldedPrice={false} />
              </Typography>
            </Box>
            <Box
              sx={theme => ({
                display: "flex",
                flexDirection: "column",
                pr: theme.spacing(1),
                [theme.breakpoints.down("sm")]: {
                  pr: 0,
                  flexDirection: "row",
                },
                gap: theme.spacing(1),
              })}
            >
              <Typography level="title-sm">Status</Typography>
              <OrderStatusIcon orderStatus={order.stateDescription.orderState} />
            </Box>
          </Box>
          <Box
            sx={theme => ({
              alignSelf: "center",
            })}
          >
            <Button variant="outlined" onClick={handleOnClick}>
              Arată
            </Button>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={theme => ({
            display: "flex",
            width: "100%",
            flexDirection: "column",
          })}
        >
          {order?.items?.nodes?.map(orderItem => (
            <Box key={`${orderItem.id}-parent`}>
              <OrderItemSlot
                key={`${orderItem.id}-list-item`}
                productExtraOptions={orderItem.extraOptions.map(x=>{return {...x, id: x.extraOptionId}})}
                productId={orderItem.productId}
                productName={orderItem.productName}
                totalProductPrice={orderItem.orderItemTotalPrice}
                productImageUrl={orderItem.image?.url}
                quantity={orderItem.quantity}
                productLink={`/${orderItem.product?.siteSummary.slug}/${orderItem.product?.slug}`}
              />
              {order.items?.nodes?.at(order.items?.nodes?.length - 1) !== orderItem && (
                <Divider
                  key={`${orderItem.id}-divider`}
                  sx={theme => ({
                    width: "100%",
                    my: theme.spacing(1),
                  })}
                />
              )}
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
