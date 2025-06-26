"use client";
import React, { useEffect, useRef } from "react";
import { Typography, List, ListItem } from "@mui/joy";
import ProductModal from "@/components/organisms/product/ProductModal";
import { graphql } from "@/gql";
import { FragmentType, useFragment } from "@/gql/fragment-masking";
import { ProductDetails } from "@/providers/BasketProvider";
import ProductListItem from "@moleculas/ProductListItem";
import { Box } from "@mui/system";

const offsetScroll = 10;

const SiteDetailsFragment = graphql(/* GraphQL */ `
  fragment SiteDetails on Site {
    name
    id
    slug
    categories(order: [{ displayNumber: ASC }]) {
      nodes {
        id
        name
        slug
        products(order: [{ name: ASC }]) {
          nodes {
            id
            ...ProductListItem
          }
        }
      }
    }
  }
`);

type SiteProductsProps = {
  site: FragmentType<typeof SiteDetailsFragment>;
  scrollToCategory?: string;
};

const SiteProducts = (props: SiteProductsProps) => {
  const site = useFragment(SiteDetailsFragment, props.site);
  const [open, setOpen] = React.useState<boolean>(false);
  const [productSelected, setProductSelected] = React.useState<ProductDetails | undefined>(
    undefined
  );
  const scrollToCategory = props.scrollToCategory;
  const scrollToRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = document.getElementById("header");
    if (header && scrollToRef.current && scrollToCategory) {
      const offsetPostion =
        scrollToRef.current.getBoundingClientRect().top -
        header.clientHeight +
        window.scrollY -
        offsetScroll;
      window.scrollTo({
        top: offsetPostion,
        behavior: "smooth",
      });
    }
  }, []);

  const handleOpen = (value: boolean) => {
    if (value === false) {
      setProductSelected(undefined);
    }
    setOpen(value);
  };

  const handleSetProduct = (product: ProductDetails) => {
    setProductSelected(product);
  };

  const handleOnOpenChange = (product: ProductDetails) => {
    handleSetProduct(product);
    handleOpen(true);
  };

  return (
    <>
      {productSelected && (
        <ProductModal
          product={productSelected}
          open={open}
          onOpenChange={handleOpen}
        ></ProductModal>
      )}

      <List
        sx={theme => ({
          display: "flex",
          flexDirection: "column",
          paddingBlock: 0,
          gap: theme.spacing(5),
        })}
      >
        {site.categories?.nodes?.map(category => (
          <ListItem
            nested
            key={category.id}
            sx={{
              paddingInlineStart: "0",
              paddingInlineEnd: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List
              sx={theme => ({
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                [theme.breakpoints.down("xl")]: {
                  maxWidth: "1072px",
                },
                [theme.breakpoints.down("lg")]: {
                  maxWidth: "798px",
                },
                [theme.breakpoints.down("md")]: {
                  maxWidth: "524px",
                },
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "282px",
                },
                flexWrap: "wrap",
                columnGap: theme.spacing(3),
                rowGap: theme.spacing(3),
                paddingInlineStart: "0",
                paddingInlineEnd: "0",
                marginInline: "0",
              })}
            >
              <Box
                ref={category.slug === scrollToCategory ? scrollToRef : null}
                sx={theme => ({ width: "100%", marginBottom: theme.spacing(-1) })}
              >
                <Typography level="h4" sx={{ textTransform: "uppercase" }}>
                  {" "}
                  {category.name}{" "}
                </Typography>
              </Box>
              {category.products?.nodes?.map(product => {
                return (
                  <ProductListItem
                    key={product.id}
                    product={product}
                    handleOnOpenChange={handleOnOpenChange}
                  />
                );
              })}
            </List>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SiteProducts;
