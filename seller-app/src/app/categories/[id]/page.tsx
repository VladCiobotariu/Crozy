"use client";

import React from "react";
import { useGetCategoryWithProductsByIdQuery } from "../../../generated/graphql";
import { Box, Typography } from "@mui/material";
import BackButton from "../../../components/atoms/BackButton";
import ProductList from "../../../components/organisms/products/ProductList";
import { useRouteId } from "../../../hooks";
import CircularProgress from '@mui/material/CircularProgress';

type ViewCategoryQuery = {
    id: string;
}

const ViewCategoryContent = ({ id }: ViewCategoryQuery) => {

    const { data, loading, error } = useGetCategoryWithProductsByIdQuery({variables: {id}});

    const products = data?.categoryById?.products?.nodes?.map(x => ({
        ...x,
        image: x.image?.url,
        categoryProductsId: (x.categories?.map((category: any) => category.name) || []),
        siteProductsId: x.site.name,
      }));

    return loading ? (
      <Typography>Loading page...</Typography>
    ) : (
      products && (
      <>
        <Box sx={{display: "flex", justifyContent: "flex-start", marginBottom: 3}}>
          <BackButton/>
        </Box>
        <Typography sx={{fontSize: 30}}>{data?.categoryById?.name}</Typography>
        <ProductList products={Array.isArray(products) ? products : [products]}/>
      </>
    ));
};

const ViewCategoryPage = () => {
  const id = useRouteId();
  return <>{id ? <ViewCategoryContent id={id} /> : <CircularProgress /> }</>
}

export default ViewCategoryPage;