"use client";

import { FragmentType, graphql, useFragment } from "@/gql";
import Breadcrumb, { IBreadcrumb } from "@moleculas/Breadcrumb";
import ProductTemplatePage from "@moleculas/product-template/ProductTemplatePage";
import { Box } from "@mui/joy";
import React from "react";

const ProductFieldsFromProductSlugFragment = graphql(/* GraphQL */ `
  fragment ProductFieldsFromProductSlug on Product {
    name
    id
    price {
      amount
      currency
    }
    slug
    description
    siteId
    extraOptions {
      category{
        id
        name
      }
      extraOptionCategoryId
      price {
        amount
        currency
      }
      id
      name
    }
    siteSummary {
      name
      slug
    }
    categories {
      name
      slug
    }
    image {
      url
    }
  }
`);

type ProductPageContentProps = {
  product: FragmentType<typeof ProductFieldsFromProductSlugFragment>;
};

const ProductPageContent = (props: ProductPageContentProps) => {
  const product = useFragment(ProductFieldsFromProductSlugFragment, props.product);

  const breadcrumbs: IBreadcrumb[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: product?.siteSummary.name,
      link: `/${product?.siteSummary.slug}`,
    },
    {
      title: product?.categories?.at(0)?.name,
      link: `/${product?.siteSummary.slug}?category=${product?.categories?.at(0)?.slug}`,
    },
  ];

  const handleAddToBasketClick = () => {};

  return (
    <Box
      sx={theme => ({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          paddingX: theme.spacing(2),
        },
        flexGrow: "1",
      })}
    >
      <Breadcrumb breadcrumbs={breadcrumbs} currentObjectTitle={product?.name} />
      <ProductTemplatePage
        product={{ ...product, image: product.image?.url }}
        onProductAddedToBasket={handleAddToBasketClick}
      />
    </Box>
  );
};

export default ProductPageContent;
