"use client";

import {
  Box,
  useTheme,
  Typography,
  CircularProgress,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useGetProductByIdQuery } from "../../../generated/graphql";
import useResponsiveImage from "../../../hooks/useResponsiveImage";
import BackButton from "../../../components/atoms/BackButton";
import EditIcon from "@mui/icons-material/Edit";
import ProductDetail from "../../../components/atoms/ProductDetail";
import { useRouteId } from "../../../hooks";
import ExtraOptionsProduct from "@/components/organisms/extra-options/ExtraOptionsProduct";
import { toDisplayedPrice } from "@/utils";

type ViewProductQuery = {
  id: string;
};

const ViewProductContent = ({ id }: ViewProductQuery) => {
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  const { loading, error, data } = useGetProductByIdQuery({ variables: { id } });

  const productDetails = [
    {
      label: "Pret",
      content: toDisplayedPrice(data?.productById.price),
    },
    { label: "Descriere", content: data?.productById.description },
    { label: "Slug", content: data?.productById.slug },
    {
      label: data?.productById?.categories.length === 1 ? "Category" : "Categories",
      content:
        data?.productById?.categories?.map(category => category.name).join(", ") ||
        "No categories available",
    },
    { label: "Site", content: data?.productById.site.name },
  ];

  const src = useResponsiveImage({
    src: data?.productById.image?.url,
    width: 300,
    height: 300,
  });

  const altText: string = data?.productById.name || "product-image";

  const containerStyle = {
    display: "flex",
    flexDirection: isSmallSize ? "column" : "row",
    justifyContent: isSmallSize ? "center" : "space-between",
    padding: theme.spacing(3),
    background: "white",
    maxWidth: !isSmallSize ? 1200 : 350,
    position: "relative",
    border: "1px solid rgb(205, 215, 225)",
    borderRadius: theme.spacing(1),
  };

  const variantForTitle = isSmallSize ? "h5" : "h4";

  const titleWithEditIconStyle = {
    display: "flex",
    justifyContent: isSmallSize ? "space-between" : "none",
    alignItems: "center",
  };

  return loading ? (
    <Typography>Loading page...</Typography>
  ) : (
    data?.productById && (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 5 }}>
          <BackButton/>
        </Box>
        <Box sx={containerStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallSize ? "column" : "row",
              gap: isSmallSize ? theme.spacing(3) : theme.spacing(5),
            }}
          >
            <Box flexShrink={0} sx={{ justifyContent: "center", display: "flex" }}>
              {src && <Image src={src} alt={altText} width={300} height={300} />}
            </Box>
            <Box flexGrow={1}>
              <Box sx={titleWithEditIconStyle}>
                <Typography variant={variantForTitle} sx={{ fontWeight: "bold" }}>
                  {data?.productById.name}
                </Typography>
                <Link href={`/products/edit/${id}`}>
                  <IconButton sx={{ color: theme.palette.colors.PRIMARY, pl: theme.spacing(2) }}>
                    <EditIcon />
                  </IconButton>
                </Link>
              </Box>
              {productDetails.map(
                item =>
                  item.label &&
                  item.content && (
                    <ProductDetail
                      key={item.label}
                      label={item.label}
                      content={item.content}
                      isSmallSize={isSmallSize}
                    />
                  )
              )}
              <ExtraOptionsProduct extraOptions={data.productById.extraOptions}/>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

const ViewProductPage = () => {
  const id = useRouteId();
  return <>{id ? <ViewProductContent id={id} /> : <CircularProgress />}</>;
};

export default ViewProductPage;
