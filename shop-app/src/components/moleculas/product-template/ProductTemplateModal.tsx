import ProductDetailsComponent from "@atoms/product-summary/ProductDetailsComponent";
import { Box, Skeleton, useTheme } from "@mui/joy";
import useResponsiveImage from "@/hooks/useResponsiveImage";
import { ProductDetails } from "@/providers/BasketProvider";

type ProductTemplateModalProps = {
  product: ProductDetails;
  onProductAddedToBasket: () => void;
};

const ProductTemplateModal = ({ product, onProductAddedToBasket }: ProductTemplateModalProps) => {
  const theme = useTheme();

  const imgSrcSmall = useResponsiveImage({ src: product?.image, width: 268, height: 268 });
  const imgSrcBig = useResponsiveImage({ src: product?.image, width: 400, height: 400 });

  return (
    <>
      <Box
        sx={theme => ({
          display: "flex",
          height: "100%",
          [theme.breakpoints.up("sm")]: {
            flexGrow: 1,
            flexDirection: "row",
          },
          [theme.breakpoints.down("sm")]: {
            gap: theme.spacing(4),
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          },
          [theme.breakpoints.between("sm", "md")]: {
            gap: theme.spacing(4),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        })}
      >
        <Box
          sx={theme=>({
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pr: theme.spacing(2),
            width: "calc(400px + 1rem)",
            flexShrink: "0",
            [theme.breakpoints.down("md")]: {
              maxWidth: "268px",
              pr: "0",
            },
          })}
        >
          {/* We use this to get rid of unwanted  GET http://localhost:3001/undefined 404 (Not Found)  requests when product is undefined*/}
          {!!imgSrcBig && !!imgSrcSmall ? (
            <img
              alt={product.name}
              srcSet={`
                ${imgSrcBig} 400w,
                ${imgSrcSmall} 268w
              `}
              sizes={`
                (max-width: ${theme.breakpoints.values.md - 1}px) 268px,
                (min-width: ${theme.breakpoints.values.md - 1}px) 400px,                
              `}
              style={{
                maxWidth: "400px",
                width: "100%",
                height: "100%",
                borderRadius: "14px",
              }}
            />
          ) : (
            <Skeleton
              variant="inline"
              animation="wave"
              sx={theme => ({
                borderRadius: "14px",
                width: 400,
                height: 400,
                [theme.breakpoints.down("md")]: {
                  height: 268,
                  width: 268,
                },
              })}
            />
          )}
        </Box>
        <Box
          sx={theme => ({
            pl: theme.spacing(2),
            width: "100%",
            [theme.breakpoints.up("md")]: {
              maxHeight: "400px",
            },
            [theme.breakpoints.down("md")]: {
              pl: 0,
            },
            [theme.breakpoints.down("sm")]: {
              pb: theme.spacing(4),
            },
            flexGrow: "1",
          })}
        >
          <ProductDetailsComponent
            sx={{ height: "100%" }}
            product={product}
            onProductAddedToBasket={onProductAddedToBasket}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductTemplateModal;
