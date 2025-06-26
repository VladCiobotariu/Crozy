import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/joy/IconButton";
import QuantityPicker from "@atoms/QuantityPicker";
import ProductImage from "@atoms/product-summary/ProductImage";
import ProductTitle from "@atoms/product-summary/ProductTitle";
import TotalItemPrice from "@moleculas/TotalItemPrice";
import { Sheet, useTheme } from "@mui/joy";
import Box from "@mui/joy/Box";
import { BasketItem, useBasket } from "../../../providers";
import Link from "next/link";
import ExtraOptionsNames from "@moleculas/order-summary/ExtraOptionsName";

type ShoppingCartItemProps = {
  item: BasketItem;
};

const ShoppingCartItem = ({ item }: ShoppingCartItemProps) => {
  const theme = useTheme();
  const { updateQuantity, removeFromBasket } = useBasket();

  const onQuantityChanged = (newQuantity: number) => {
    updateQuantity(item.guid, newQuantity);
  };

  const onRemoveItem = () => {
    removeFromBasket(item);
  };

  return (
    <>
      <Sheet
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateAreas: `
              "image title title quantity totalPrice delete"
              "image extras extras quantity totalPrice delete"
              `,
          gridTemplateColumns: "2fr 6fr 6fr 2fr 3fr 1fr",
          [theme.breakpoints.down("md")]: {
            gridTemplateAreas: `
            "image title quantity delete"
            "image extras extras totalPrice"
                  `,
            gridTemplateColumns: "1fr 4fr 2fr 2fr",
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateAreas: `
              "image title title delete"
              "image extras extras extras"
              "totalPrice totalPrice quantity quantity"
              `,
            gridTemplateColumns: "1fr 2fr 2fr 1fr",
          },
          columnGap: theme.spacing(2),
          rowGap: theme.spacing(1),
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={theme => ({
            gridArea: "image",
            [theme.breakpoints.down("md")]: {
              justifySelf: "self-start",
              alignSelf: "self-start",
            },
            justifySelf: "self-start",
          })}
        >
          <Link
            href={`/${item.product.siteSummary.slug}/${item.product.slug}`}
            style={{
              color: theme.palette.text.secondary,
              paddingBlock: 0,
              paddingInline: 0,
              marginInline: 0,
            }}
          >
            <ProductImage src={item.product?.image} productName={item.product.name} />
          </Link>
        </Box>
        <Box
          sx={theme => ({
            gridArea: "title",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1),
            width: "100%",
            justifySelf: "self-start",
            alignSelf: "self-end",
            [theme.breakpoints.down("md")]: {
              justifySelf: "self-start",
              alignSelf: "self-start",
            },
            [theme.breakpoints.down("sm")]: {
              alignSelf: "start",
            },
          })}
        >
          <Link
            href={`/${item.product.siteSummary.slug}/${item.product.slug}`}
            style={{
              color: theme.palette.text.secondary,
              paddingBlock: 0,
              paddingInline: 0,
              marginInline: 0,
            }}
          >
            <ProductTitle productName={item.product.name} />
          </Link>
        </Box>
        <Box sx={theme => ({
          gridArea: "extras",
          width: "100%",
          justifySelf: "self-start",
          alignSelf: "self-start",
          [theme.breakpoints.down("md")]: {
            alignSelf: "center",
          },
        })}>
          <ExtraOptionsNames productExtraOptions={item.extraOptions} />
        </Box>
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: {
              width: "fit-content",
            },
            gridArea: "quantity",
            [theme.breakpoints.down("md")]: {
              justifySelf: "self-end",
              alignSelf: "self-start",
              pl: 4,
            },
            [theme.breakpoints.down("sm")]: {
              justifySelf: "self-end",
              padding: theme.spacing(0),
            },
          }}
        >
          <QuantityPicker quantity={item.quantity} onQuantityChanged={onQuantityChanged} />
        </Box>
        <Box
          sx={theme => ({
            gridArea: "totalPrice",
            justifySelf: "self-end",
            pr: {
              xs: 0,
              sm: 0,
              md: 2,
              lg: 4,
              xl: 8,
            },
            [theme.breakpoints.down("md")]: {
              alignSelf: "flex-end",
              justifySelf: "self-end",
            },
            [theme.breakpoints.down("sm")]: {
              alignSelf: "flex-end",
              justifySelf: "self-start",
            },
          })}
        >
          <TotalItemPrice dislayTotalText={false} totalPrice={item.totalItemPrice} />
        </Box>
        <Box
          sx={{
            gridArea: "delete",
            justifySelf: "self-end",
            [theme.breakpoints.down("md")]: {
              justifySelf: "self-end",
              alignSelf: "self-start",
            },
            [theme.breakpoints.down("sm")]: {
              justifySelf: "self-end",
              alignSelf: "start",
            },
          }}
        >
          <IconButton
            onClick={onRemoveItem}
            variant="plain"
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Sheet>
    </>
  );
};

export default ShoppingCartItem;
