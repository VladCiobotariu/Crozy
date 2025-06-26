import { PaymentType } from "@/gql/graphql";
import theme from "@/utils/theme";
import DetailsSummaryContainer from "@atoms/order-summary/DetailsSummaryContainer";
import { Typography } from "@mui/joy";
import React from "react";

type PaymentDetailsComponentType = {
    paymentType: PaymentType;
}
const PaymentDetailsComponent = ({paymentType}:PaymentDetailsComponentType) => {

    const convertPaymentTypeToTexts = (paymentType: PaymentType) => {
      switch (paymentType) {
          case PaymentType.Cash:
            return {
              displayValue: "Cash",
              displayedText: "Plata va fi efectuată atunci când se va livra comanda."
          };
          case PaymentType.Card:
            return {
              displayValue: "Card",
              displayedText: "După plasarea comenzii, veți fi redirecționat către procesorul de plăți."
          };
          default:
              throw new Error("Payment Type should only be Cash or Card.");
      }
    };

    return (
        <DetailsSummaryContainer label={"Modalitate de plată"}>
            <Typography sx={theme => ({
              fontWeight: "500", 
              mb: 1,
              [theme.breakpoints.down('md')]: {
                mb: 0.5,
                fontSize: "14px"
              },
            })}>
              {convertPaymentTypeToTexts(paymentType).displayValue}
            </Typography>
            <Typography sx={{
              fontWeight: "300", 
              [theme.breakpoints.down('md')]: {
                fontSize: "14px"
              },
              }}>
                {convertPaymentTypeToTexts(paymentType).displayedText}
            </Typography>
        </DetailsSummaryContainer>
    );
};

export default PaymentDetailsComponent;