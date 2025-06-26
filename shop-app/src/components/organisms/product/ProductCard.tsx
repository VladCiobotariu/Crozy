
import useResponsiveImage from "../../../hooks/useResponsiveImage";
import { Box, Card, IconButton, Typography, useTheme } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { ProductDetails } from "@/providers/BasketProvider";
import Currency from "@atoms/Currency";

type ProductCardProps = {
  product: ProductDetails;
  onOpenChange: (product: ProductDetails) => void;
};

const ProductCard = ({ product, onOpenChange }: ProductCardProps) => {
  const theme = useTheme();

  const handleOnClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    onOpenChange(product);
  };

  return (
    <Card
      sx={theme => ({
        height: "419px",
        width: "282px",
        [theme.breakpoints.down("xl")]: {
          height: "387px",
          width: "250px",
        },
        [theme.breakpoints.down("sm")]: {
          height: "419px",
          width: "282px",
        },
        borderRadius: "20px",
        boxShadow: theme.shadow.md,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: theme.spacing(2),
        gap: theme.spacing(2),
      })}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          srcSet={`
            ${useResponsiveImage({ src: product?.image, width: 250, height: 250 })} 250w,
            ${useResponsiveImage({ src: product?.image, width: 218, height: 218 })} 218w
          `}
          sizes={`
            (max-width: ${theme.breakpoints.values.sm - 1}px) 250px,
            (max-width: ${theme.breakpoints.values.xl - 1}px) 218px,
            (min-width: ${theme.breakpoints.values.xl - 1}px) 250px
          `}
          alt={product.name}
        />
      </Box>

      <Box
        sx={theme => ({
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: theme.spacing(1),
          textAlign: "left",
        })}
      >
        <Box
          sx={theme => ({
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: theme.spacing(1),
          })}
        >
          <Typography
            level="title-sm"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              alignSelf: "stretch",
              position: "relative",
              minHeight: "2.5rem",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            level="body-sm"
            sx={theme => ({
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              alignSelf: "stretch",
              minHeight: `calc(${theme.typography["body-sm"].lineHeight}*2)`,
            })}
          >
            {product.description}
          </Typography>
        </Box>

        <Box
          sx={{
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="title-md">
            <Currency price={product.price} sx={{fontWeight: "600"}} variant="normal"/>
          </Typography>
          <IconButton
            onClick={handleOnClick}
            variant="solid"
            color="primary"
            sx={{
              "--IconButton-size": "2.5rem",
              "--Icon-fontSize": "1rem",
              borderRadius: "20px",
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
