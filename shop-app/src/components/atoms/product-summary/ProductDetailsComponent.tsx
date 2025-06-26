import QuantityPicker from "@atoms/QuantityPicker";
import { Typography, Button } from "@mui/joy";
import { Box, SxProps, color } from "@mui/system";
import { Theme } from "@mui/joy";
import { ExtraOption, ProductDetails, useBasket } from "@/providers/BasketProvider";
import ExtraOptions from "./ExtraOptions";
import { useState } from "react";
import Currency from "@atoms/Currency";
import UnitPrice from "@moleculas/UnitPrice";

type ProductDetailsProps = {
  product: ProductDetails;
  onProductAddedToBasket: () => void;
  sx?: SxProps<Theme>;
};

const ProductDetailsComponent = ({
  product,
  onProductAddedToBasket,
  sx = [],
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [extraOptions, setExtraOptions] = useState<ExtraOption[]>([]);
  const [extraOptionsPrice, setExtraOptionsPrice] = useState<number>(0);
  const { addToBasket } = useBasket();

  const handleAddToBasketClick = () => {
    addToBasket(product, quantity, extraOptions);
    onProductAddedToBasket();
  };

  const handleQuantityChanged = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleExtraOptionsAdded = (newExtraOption: ExtraOption) => {
    setExtraOptionsPrice(extraOptionsPrice + newExtraOption.price.amount)
    setExtraOptions([...extraOptions, newExtraOption]);
  };

  const handleExtraOptionsRemoved = (removedExtraOption: ExtraOption) => {
    setExtraOptionsPrice(extraOptionsPrice - removedExtraOption.price.amount)
    setExtraOptions(extraOptions.filter(x=>x != removedExtraOption));
  };

  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <Box
        sx={theme => ({
          overflow: "none",
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          mb: theme.spacing(2),
        })}
      >
        <Typography level="title-lg">{product?.name}</Typography>
      </Box>
      <Box
        sx={[
          theme => ({
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            [theme.breakpoints.up("sm")]: {
              maxHeight: "inherit",
            },
            [theme.breakpoints.down("sm")]: {
              maxWidth: "100vw",
              flexGrow: "1",
            },
            [theme.breakpoints.between("sm", "md")]: {
              gap: theme.spacing(2),
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          sx={theme => ({
            overflow: "none",
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: theme.spacing(2),
          })}
        >
          <UnitPrice price={product.price} sx={theme=>({fontWeight: "600", fontSize: theme.typography["title-md"].fontSize, lineHeight: theme.typography["title-md"].lineHeight})}/>
          {!!product.description &&
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "2",
              }}
              level="body-md"
            >
              {product?.description}
            </Typography>
          }
          <ExtraOptions productExtraOptions={product.extraOptions} onExtraOptionsAdded={handleExtraOptionsAdded} onExtraOptionsRemoved={handleExtraOptionsRemoved}/>
        </Box>
          
        <Box
          sx={theme => ({
            bottom: 0,
            mt: theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
              backgroundColor: theme.palette.background.surface,
              position: "sticky",
              mt: theme.spacing(2),
            },
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(3),
          })}
        >
          <QuantityPicker quantity={quantity} onQuantityChanged={handleQuantityChanged} />
          <Button
            size="lg"
            sx={{
              width: "100%",
            }}
            onClick={handleAddToBasketClick}
          >
            <Box>
              <Typography sx={{color: "#FFF", fontWeight: "600", fontSize: "1rem", display:"inline"}}>
                Adaugă in coș{" "}
              </Typography>
              <Currency price={{amount: quantity * (product.price.amount + extraOptionsPrice), currency: product.price.currency}} sx={{fontWeight: "600"}}/>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsComponent;
