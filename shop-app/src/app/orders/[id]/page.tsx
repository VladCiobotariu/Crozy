
import { Box, Skeleton, Typography } from "@mui/joy";
import EmptyShoppingCart from "@/components/organisms/shopping-cart/EmptyAlert";
import { graphql } from "@/gql";
import { getClient } from "@/lib/apolloClientFactoryRSC";
import OrderItemPage from "@/components/organisms/order-item/OrderItemPage";

type OrderPageProps = {
  params: {
    id: string;
  }
};

const getOrderByIdQueryDocument = graphql(/* GraphQL */ `
  query getOrderByIdQuery($orderId: ID!) {
    orderById(id: $orderId) {
      order {
        orderDateTime
        ...OrderByIdDetails
      }
    }
  }
`);

const OrderPage = async ({params}: OrderPageProps) => {

  const id = decodeURIComponent(params.id);
  const client = getClient();
  const {data, loading} = await client.query({
    query: getOrderByIdQueryDocument,
    variables: {orderId: id}
  });

  return (
    <>
      {data?.orderById.order ?
        <OrderItemPage 
          order={data?.orderById.order}
        /> : loading ? 
        <Box sx={theme => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        })}>
          <Typography level="h4">
            <Skeleton>{"Comanda: ON-000001"}</Skeleton>
          </Typography>
          <Typography level="title-sm">
            <Skeleton>{"Data: 26 Feb 2024, 17:07"}</Skeleton>
          </Typography>
          <Typography level="title-sm">
            <Skeleton>{"Status: Processing"}</Skeleton>
          </Typography>
          <Typography level="title-md" sx={theme=>({mt: theme.spacing(2)})}>
            <Skeleton>{"Sumarul comenzii:"}</Skeleton>
          </Typography>
        </Box> : 
        <EmptyShoppingCart link="/orders/history" text="Comanda aceasta nu există, poți vizualiza toate comenzile de" highlightedText="aici." />
      }
    </>
  );
};

export default OrderPage;
