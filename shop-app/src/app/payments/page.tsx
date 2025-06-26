import Payments from "./Payments";
import { getClient } from "@/lib/apolloClientFactoryRSC";
import { graphql } from "@/gql";

const CreatePaymentDataMutation = graphql(/* GraphQL */ `
  mutation CreatePaymentDataMutation($input: CreatePaymentDataInput!) {
    createPaymentData(input: $input) {
      pymentData {
        data
        key
        cipher
        iv
        paymentUri
      }
      errors {
        message
        code
      }
    }
  }
`);

const PaymentsPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { order: string };
}) => {
  const orderId = searchParams?.order;
  if (!orderId) {
    throw new Error("Order id must be provided mandatory");
  }
  const client = getClient();
  const result = await client.mutate({
    mutation: CreatePaymentDataMutation,
    variables: { input: { orderId: orderId } },
  });

  const  { data, errors }  = result;
  const paymentData = data?.createPaymentData.pymentData;
  if(errors){
    // TODO: handle errors
  }
  return (
    <>
      {paymentData && (
        <Payments
          data={paymentData.data}
          iv={paymentData.iv}
          envKey={paymentData.key}
          cipher={paymentData.cipher}
          paymentUri={paymentData.paymentUri}
        />
      )}
    </>
  );
};

export default PaymentsPage;
