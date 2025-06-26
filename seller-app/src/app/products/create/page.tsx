"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { AddProductInput, Currency, useAddProductMutation } from "../../../generated/graphql";
import BackButton from "../../../components/atoms/BackButton";
import { CreateEditProduct, ProductFormInput } from "../../../components/organisms";

const CreateProduct = () => {
  const router = useRouter();
  const [addProduct, { loading, error }] = useAddProductMutation();

  const onCreateProducts = async (data: ProductFormInput) => {
    await addProduct({
      variables: { input: { 
        ...data, 
        price: data.price, 
        currency: data.currency
      } 
    },
    });
    router.push("/products");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton/>
      </Box>
      <CreateEditProduct onFormSubmitted={onCreateProducts} />
    </Box>
  );
};

export default CreateProduct;
