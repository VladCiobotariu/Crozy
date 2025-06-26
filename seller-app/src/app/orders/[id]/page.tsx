"use client";

import { Card, CardContent, CircularProgress, Grid, useTheme } from "@mui/material";
import React from "react";
import TableConfig from "../TableConfigOrderItems.json";
import { Box, Typography } from "../../../components/atoms";
import { OrderProvider, useOrder } from "../../../providers/OrderProvider";
import BackButton from "../../../components/atoms/BackButton";
import OrderStateComponent from "../../../components/moleculas/OrderState";
import { HeaderProps, Table } from "../../../components/moleculas";
import { useRouteId } from "../../../hooks";
import { toDisplayedPrice } from "@/utils";

type StyledDetailsTextProps = {
  fieldName: string;
  fieldValue: string;
};

const StyledDetailsText = ({fieldName, fieldValue}: StyledDetailsTextProps) => {

  return (
    <Typography sx={{ fontWeight: "light", mt: 0.5 }}>
      <Typography component="span" sx={{ fontWeight: "regular" }}>
        {fieldName}:{" "}
      </Typography>
      {fieldValue}
    </Typography>
  );
};

const ViewOrderContent = () => {
  const theme = useTheme();
  const { Header }: { Header: Array<HeaderProps> } = TableConfig;

  const { order, 
    loadingOrder, 
    handleStartOrderProcessing, 
    handleCompleteOrder, 
    handleCancelOrder, 
    startOrderProcessingLoading,
    completeOrderLoading,
    cancelOrderLoading, } = useOrder();

  const address = order?.shippingAddress;
  const customerDetails = order?.customerDetails;

  const deliveryAddressData = [
    { fieldName: "Country", fieldValue: address?.country},
    { fieldName: "City", fieldValue: address?.city},
    {
      fieldName: "Address",
      fieldValue: address?.line2
        ? `${address?.line1}, ${address?.line2}`
        : address?.line1,
    },
  ];

  const customerData = [
    { fieldName: "Full name", fieldValue: customerDetails?.fullName},
    { fieldName: "Email", fieldValue: customerDetails?.email},
    { fieldName: "Phone number", fieldValue: customerDetails?.phoneNumber},
  ];

  const orderItems = order?.items?.nodes?.map(x => ({
    ...x,
    price: toDisplayedPrice(x.orderItemTotalPrice),
    extraOptions: x.extraOptions.length === 0 ? "None" : x.extraOptions.map(x=>`${x.name}, `)
  }));

  const cardStyle = {
    maxWidth: "30rem", 
    margin: theme.spacing(2, 0), 
    boxShadow: theme.shadows[3],
  };

  const cardTitleStyle = { 
    fontSize: 20, 
    fontWeight: "medium", 
    mb: 1.5,
  };

  return loadingOrder ? (
    <Typography>Loading order...</Typography>
  ) : (
    order ? (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-start"}}>
            <BackButton/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="b2_heading" sx={{fontSize: 50}}>
            {order?.number}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <OrderStateComponent
              orderStateDescription={order.stateDescription}
              onStartProcessing={handleStartOrderProcessing}
              onCompleted={handleCompleteOrder}
              onCanceled={handleCancelOrder}
              loadingOrder={loadingOrder}
              startOrderProcessingLoading={startOrderProcessingLoading}
              completeOrderLoading={completeOrderLoading}
              cancelOrderLoading={cancelOrderLoading}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} marginTop={-3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={cardTitleStyle}>
                <Typography sx={{fontSize: 20}}>
                  Delivery Address
                </Typography>
                  
              </Box>
              {address?.displayName && (
                <Box sx={{ my: 1.5 }}>
                  <Typography sx={{fontSize: 18, fontWeight: "medium"}}>
                    {address?.displayName}
                  </Typography>           
                </Box>
              )}
              {deliveryAddressData.map((item) => (
                item.fieldName && item.fieldValue && (
                  <StyledDetailsText 
                    key={item.fieldName} 
                    fieldName={item.fieldName} 
                    fieldValue={item.fieldValue} />
                )
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} marginTop={-3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={cardTitleStyle}>
                <Typography sx={{fontSize: 20}}>
                  Customer
                </Typography>
                
              </Box>
              {customerData.map((item) => (
                item.fieldName && item.fieldValue && (
                  <StyledDetailsText
                    key={item.fieldName} 
                    fieldName={item.fieldName} 
                    fieldValue={item.fieldValue} />
                )
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Table padding="normal" 
                 headers={Header} 
                 rows={orderItems} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="b5_regular" sx={{fontSize: 20, fontWeight: "bold"}}>
            Total Price: {toDisplayedPrice(order?.totalPrice)}
          </Typography>
        </Grid>

      </Grid>
    ) : (
      <Typography>Sorry, could not find the order you are looking for!</Typography>
    )
  );
};

const ViewOrderPage = () => {
  const id = useRouteId();
  
  return id ? (
    <OrderProvider id={id}>
      <ViewOrderContent />
    </OrderProvider>
  ) : (
    <CircularProgress /> 
  );
};

export default ViewOrderPage;
