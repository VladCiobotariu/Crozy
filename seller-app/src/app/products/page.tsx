"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { Box } from "../../components/atoms";
import {
  useGetAllProductsQuery
} from "../../generated/graphql";
import BackButton from "../../components/atoms/BackButton";
import ProductList from "../../components/organisms/products/ProductList";
import { useOrganisation } from "../../providers/OrganisationProvider";


const ListProducts = () => {

  const { organisationId } = useOrganisation()
  const { data, loading, error } = useGetAllProductsQuery({variables: {organisationId: organisationId}});
  const products = data?.products?.nodes?.map(x => ({
    ...x,
    image: x.image?.url,
    categoryProductsId: (x.categories?.map((category: any) => category.name) || []),
    siteProductsId: x.site.name,
  }));
  
  return (loading) ? (
      <Typography>Loading page...</Typography>
      ) : (
      <React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <BackButton href="/" />
            <Button component="a" variant="contained" LinkComponent={Link} href="/products/create">
              Create
            </Button>
        </Box>
        <ProductList products={products} />
      
      </React.Fragment>
  );
};

export default ListProducts;
