"use client";

import { Address, CustomerDetails, useBasket } from "@/providers";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/joy";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Noop, RefCallBack, useForm } from "react-hook-form";
import DeliveryOptionPicker from "@moleculas/DeliveryOptionPicker";
import EmptyAlert from "../shopping-cart/EmptyAlert";
import { FragmentType, graphql, useFragment } from "@/gql";
import { PaymentType } from "@/gql/graphql";

type FormInput = {
  deliveryAddress: Address;
  customerDetails: CustomerDetails;
  paymentType: PaymentType;
};

const schema = yup.object().shape({
  deliveryAddress: yup.object().shape({
    city: yup.string().required(),
    country: yup.string().required(),
    displayName: yup.string().nullable(),
    line1: yup.string().required(),
    line2: yup.string().nullable(),
    region: yup.string().required(),
  }),
  customerDetails: yup.object().shape(
    {
      firstName: yup.string().required("specificați nume de contact"),
      lastName: yup.string().required("specificați nume de contact"),
      email: yup
        .string()
        .email()
        .when("phoneNumber", {
          is: (phoneNumber: string) => !phoneNumber,
          then: schema => schema.required("specificați numarul de teleofn sau adresa de email"),
        }),
      phoneNumber: yup.string().when("email", {
        is: (email: string) => !email,
        then: schema => schema.required("specificați numarul de teleofn sau adresa de email"),
      }),
    },
    [["phoneNumber", "email"]]
  ),
  paymentType: yup.mixed<PaymentType>().oneOf(Object.values(PaymentType)).required(),
});

const SiteDeliveryInfoFragment = graphql(/* GraphQL */ `
  fragment SiteDeliveryInfo on Site {
    id
    onlyPredeffinedDeliveryOptions
    deliveryOptions {
      country
      region
      city
      line1
      line2
      displayName
    }
  }
`);

type CheckoutPageContentProps = {
  deliveryInfo: FragmentType<typeof SiteDeliveryInfoFragment>;
};

const CheckoutPageContent = (props: CheckoutPageContentProps) => {

  const deliveryInfo = useFragment(SiteDeliveryInfoFragment, props.deliveryInfo);
  const theme = useTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const {
    items,
    orderSubmitting,
    deliveryAddress,
    customerDetails,
    setCustomerDetails,
    paymentType,
    setPaymentType,
    featureFlagForShowingCardPayment,
  } = useBasket();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      deliveryAddress: {
        city: "",
        country: "",
        displayName: "",
        line1: "",
        line2: "",
        region: "",
      },
      customerDetails: {
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      },
      paymentType: featureFlagForShowingCardPayment ? PaymentType.Card : PaymentType.Cash,
    },
    resolver: yupResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);
  const addresses: Address[] | undefined = deliveryInfo?.deliveryOptions.map(
    ({ city, country, line1, region, displayName, line2 }: Address) => ({
      city,
      country,
      line1,
      region,
      displayName,
      line2,
    })
  );
  const onSubmit = async (input: FormInput) => {
    setCustomerDetails(input.customerDetails);
    setPaymentType(input.paymentType);
    setSubmitting(true);
    router.push("/order-summary");
  };

  useEffect(() => {
    if (!loaded && deliveryAddress && customerDetails) {
      reset({ deliveryAddress, customerDetails });
      setLoaded(true);
    }
  }, [deliveryAddress, customerDetails, reset, loaded]);

  return (
    <>
      {items.length !== 0 || !!orderSubmitting || submitting || !loaded ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={theme => ({
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: "sm",
                width: "100%",
              })}
            >
              <Controller
                name="deliveryAddress"
                control={control}
                render={({ field: { name, onBlur, onChange, value, ref } }) => (
                  <FormControl>
                    <FormLabel>
                      <Typography level="h4">Selectați locul de livrare</Typography>
                    </FormLabel>
                    {deliveryInfo?.deliveryOptions ? (
                      <DeliveryOptionPicker
                        name={name}
                        addresses={addresses}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value || {}}
                      />
                    ) : (
                      <>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width={300}
                          sx={{
                            my: 1,
                            p: 2,
                            border: 2,
                            borderColor: "transparent",
                          }}
                        >
                          <Typography
                            sx={{
                              height: `calc(${theme.typography["body-md"].lineHeight}*1)`,
                            }}
                          />
                        </Skeleton>
                      </>
                    )}
                  </FormControl>
                )}
              />

              <Typography level="h4">Introduceți datele de contact</Typography>

              <Controller
                name="customerDetails.firstName"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Nume</FormLabel>
                    <Input
                      error={errors.customerDetails?.firstName?.message ? true : false}
                      disabled={false}
                      size="md"
                      variant="outlined"
                      {...field}
                    />
                    {errors.customerDetails?.firstName?.message && (
                      <FormHelperText
                        sx={{ visibility: "visible", height: "1rem" }}
                        className="form-error"
                        id="customerDetails.firstName-error-text"
                      >
                        {errors?.customerDetails?.firstName?.message || ""}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name="customerDetails.lastName"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Prenume</FormLabel>
                    <Input
                      error={errors.customerDetails?.lastName?.message ? true : false}
                      disabled={false}
                      size="md"
                      variant="outlined"
                      {...field}
                    />
                    {errors.customerDetails?.lastName?.message && (
                      <FormHelperText
                        sx={{ visibility: "visible", height: "1rem" }}
                        className="form-error"
                        id="customerDetails.lastName-error-text"
                      >
                        {errors?.customerDetails?.lastName?.message || ""}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="customerDetails.phoneNumber"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Telefon de contact</FormLabel>
                    <Input
                      error={errors.customerDetails?.phoneNumber?.message ? true : false}
                      disabled={false}
                      size="md"
                      variant="outlined"
                      {...field}
                    />
                    {errors?.customerDetails?.phoneNumber?.message && (
                      <FormHelperText
                        sx={{ visibility: "visible", height: "1rem" }}
                        className="form-error"
                        id="customerDetails.phoneNumber-error-text"
                      >
                        {errors?.customerDetails?.phoneNumber?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="customerDetails.email"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Adresa de email</FormLabel>
                    <Input
                      error={errors.customerDetails?.email?.message ? true : false}
                      disabled={false}
                      size="md"
                      variant="outlined"
                      {...field}
                    />
                    {errors?.customerDetails?.email?.message && (
                      <FormHelperText
                        sx={{ visibility: "visible", height: "1rem" }}
                        className="form-error"
                        id="customerDetails.email-error-text"
                      >
                        {errors?.customerDetails?.email?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
              
              {featureFlagForShowingCardPayment ? (
                <Controller
                  name="paymentType"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Metoda de plata</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <Radio
                          checked={field.value === PaymentType.Card}
                          onChange={field.onChange}
                          value={PaymentType.Card}
                          label="Card"
                          slotProps={{ input: { "aria-label": "Card" } }}
                        />
                        <Radio
                          checked={field.value === PaymentType.Cash}
                          onChange={field.onChange}
                          value={PaymentType.Cash}
                          label="Plata cash la livrare"
                          slotProps={{ input: { "aria-label": "Plata cash la livrare" } }}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              ) : (
                <Input 
                  type="hidden"
                  {...register("paymentType")} 
                  sx={{display: "none"}}
                />
              )}
              <Button
                loading={orderSubmitting}
                type="submit"
                sx={theme => ({ mt: theme.spacing(4) })}
              >
                Pasul următor
              </Button>
            </Box>
          </form>
        </>
      ) : (
        <EmptyAlert
          link="/"
          highlightedText="la magazin."
          text="Coșul tău de cumpărături este gol! Pentru a adăuga produse în coș te rugam să te întorci"
        />
      )}
    </>
  );
};

export default CheckoutPageContent;
