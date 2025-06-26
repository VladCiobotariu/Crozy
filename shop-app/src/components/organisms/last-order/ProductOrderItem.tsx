import { FragmentType, graphql, useFragment } from "@/gql";
import { ProductDetails } from "@/providers/BasketProvider";
import theme from "@/utils/theme";
import ProductImage from "@atoms/product-summary/ProductImage";
import ProductTitle from "@atoms/product-summary/ProductTitle";
import { Box } from "@mui/joy";
import Link from "next/link";
import React from "react";

export const ProductFieldsForOrderFragment = graphql(/* GraphQL */ `
  fragment ProductFieldsForOrder on Product {
    id
    name
    price {
      amount
      currency
    }
    slug
    description
    siteId
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

type ProductOrderItemProps = {
    product: ProductDetails | undefined | null;
    imageUrl: string | undefined;
    productName: string;
};

const ProductOrderItem = (props: ProductOrderItemProps) => {
    const {imageUrl, productName, product} = props;

    return (
        <>
            <Link
                href={`/${product?.siteSummary.slug}/${product?.slug}`}
                style={{
                    color: theme.palette.text.secondary,
                    paddingBlock: 0,
                    paddingInline: 0,
                    marginInline: 0,
                    gridArea: "image",
                    justifySelf: "self-start",
                    alignSelf: "self-start",
                }}>
                <ProductImage
                    src={imageUrl}
                    productName={productName}
                />
            </Link>
            <Box sx={theme=>({ 
              gridArea: "title", 
              width: "100%", 
              textAlign: "left", 
              justifySelf: "self-start",
              alignSelf: "self-end",
              [theme.breakpoints.down('sm')]: {
                justifySelf: "self-start",
                alignSelf: "self-start",
              }
            })}>
                <Link
                    href={`/${product?.siteSummary.slug}/${product?.slug}`}
                    style={{
                    color: theme.palette.text.secondary,
                    paddingBlock: 0,
                    paddingInline: 0,
                    marginInline: 0,
                    }}
                    >
                    <ProductTitle productName={productName}/>
                </Link>
            </Box>
        </>
    );
};

export default ProductOrderItem;