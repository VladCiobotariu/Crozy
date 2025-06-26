"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../../../generated/graphql";
import { CreateEditProduct, ProductFormInput } from "../../../../components/organisms";
import BackButton from "../../../../components/atoms/BackButton";
import { useRouteId } from "../../../../hooks";

type EditProductQuery = {
  id: string;
};

const EditProductContent = ({ id }: EditProductQuery) => {
  const router = useRouter();
  const { loading, error, data } = useGetProductByIdQuery({ variables: { id } });
  const categoryIds = data?.productById?.categories
    ? data?.productById?.categories.map(x => x.id)
    : [];
  const extraOptionIds =
    data?.productById.extraOptions?.filter(x => x != undefined).map(x => x.id) ?? [];

  const product: ProductFormInput | null = data?.productById
    ? {
        ...data.productById,
        siteId: data.productById.siteId,
        image: data.productById.image?.name,
        imageUrl: data.productById.image?.url,
        price: data.productById.price.amount,
        currency: data.productById.price.currency,
        categoryIds,
        extraOptionIds,
      }
    : null;

  const [updateProduct, { loading: mutLoading, error: mutErrors }] = useUpdateProductMutation();

  const onUpdateProduct = async ({
    categoryIds,
    extraOptionIds,
    name,
    price,
    currency,
    siteId,
    slug,
    description,
    image,
    imageUrl,
  }: ProductFormInput) => {
    await updateProduct({
      variables: {
        input: {
          id,
          categoryIds,
          extraOptionIds,
          name,
          siteId,
          slug,
          description,
          image,
          price: Number(price),
          currency: currency,
        },
      },
    });
    router.push("/products");
  };

  return loading || mutLoading ? (
    <>Loading...</>
  ) : product ? (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
        <BackButton/>
      </Box>
      <CreateEditProduct onFormSubmitted={onUpdateProduct} product={product} />
    </Box>
  ) : (
    <>Product not found :/</>
  );
};

const EditProductPage = () => {
  const id = useRouteId();
  return <>{id ? <EditProductContent id={id} /> : <CircularProgress />}</>;
};
export default EditProductPage;
