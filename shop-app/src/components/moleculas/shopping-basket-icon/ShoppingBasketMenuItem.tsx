import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import useResponsiveImage from "../../../hooks/useResponsiveImage";
import Chip from "@mui/joy/Chip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/joy/IconButton";
import { useBasket } from "../../../providers";
import { Link, useTheme } from "@mui/joy";
import { BasketItem } from "@/providers/BasketProvider";
import Currency from "@atoms/Currency";

type ShoppingBasketMenuItemProps = {
  item: BasketItem;
};

const ShoppingBasketMenuItem = ({ item }: ShoppingBasketMenuItemProps) => {
  const theme = useTheme();
  const src = useResponsiveImage({ src: item.product?.image, width: 80, height: 80 });
  const { removeFromBasket } = useBasket();

  const onRemoveItem = (event: React.MouseEvent<Element, MouseEvent>) => {
    removeFromBasket(item);
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Link variant="plain" underline="none" href={`/${item.product.siteSummary.slug}/${item.product.slug}`} sx={theme=>({color: theme.palette.text.secondary})}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "4rem 9.1rem 7rem 3.125rem",
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "3.8rem 5.8rem 7rem 2.2rem",
          },
          gridTemplateRows: "auto",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <AspectRatio
          ratio="1/1"
          objectFit="cover"
          sx={{
            flexBasis: `500px`,
            justifySelf: "start",
            borderRadius: "sm",
            overflow: "auto",
            width: "50px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        >
          <img src={src} alt={item.product.name}/>
        </AspectRatio>
        <Typography
          sx={{
            justifySelf: "flex-start",
          }}
        >
          {item.product.name}
        </Typography>
        <Typography sx={{}} component="div">
          <Chip size="sm">{item.quantity}</Chip> 
          x <Currency price={item.totalItemPrice} sx={{fontWeight: "400"}}/>
        </Typography>
        <IconButton onClick={onRemoveItem} variant="plain" 
          sx={{
            "&:hover": {
              color: 'red',
            }, 
            justifySelf: "end" ,
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Link>
  );
};

export default ShoppingBasketMenuItem;
