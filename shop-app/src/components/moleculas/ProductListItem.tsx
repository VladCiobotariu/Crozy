import { FragmentType, graphql, useFragment } from "@/gql";
import { ListItem } from "@mui/joy";
import Link from "next/link";
import React from "react";
import ProductCard from "../organisms/product/ProductCard";
import { ProductDetails } from "@/providers/BasketProvider";

export const ProductListItemFragment = graphql(/* GraphQL */ `
  fragment ProductListItem on Product {
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
    categories {
      name
      slug
    }
    image {
      url
    }
  }
`);

type ProductListItemsProps = {
    product: FragmentType<typeof ProductListItemFragment>;
    handleOnOpenChange: (product: ProductDetails) => void;
}

const ProductListItem = (props: ProductListItemsProps) => {
    const product = useFragment(ProductListItemFragment, props.product);
    return (
        <ListItem
            key={product.id}
            sx={{
                display: "block",
                paddingBlockEnd: "0px",
                paddingBlockStart: "0px",
                paddingInlineEnd: "0px",
                paddingInlineStart: "0px",
            }}>
            <Link href={`/${product.siteSummary.slug}/${product.slug}`} style={{ textDecoration: "none" }}>
                <ProductCard product={{...product, image: product.image?.url}} onOpenChange={props.handleOnOpenChange}></ProductCard>
            </Link>
        </ListItem>
    );
};

export default ProductListItem;