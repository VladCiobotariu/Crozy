import useResponsiveImage from "@/hooks/useResponsiveImage";
import { ProductDetails } from "@/providers/BasketProvider";
import ProductDetailsComponent from "@atoms/product-summary/ProductDetailsComponent";
import { Skeleton, useTheme } from "@mui/joy";
import { Box } from "@mui/system";

type ProductTemplatePageProps = {
  product: ProductDetails;
  onProductAddedToBasket: () => void;
};

const ProductTemplatePage = ({ product, onProductAddedToBasket }: ProductTemplatePageProps) => {
  const theme = useTheme();

  const imgHeightBig = 400
  const imgHeightSmall = 300
  const imgSrcSmall = useResponsiveImage({ src: product?.image, width: imgHeightSmall, height: imgHeightSmall });
  const imgSrcBig = useResponsiveImage({ src: product?.image, width: imgHeightBig, height: imgHeightBig });

  return (
    <Box
      sx={theme => ({
        display: "flex",
        width: "100%",
        gap: {
          xs: theme.spacing(4),
          sm: theme.spacing(4),
          md: theme.spacing(6),
          lg: theme.spacing(8),
          xl: theme.spacing(8),
        },
        [theme.breakpoints.down("md")]: {
          width: "fit-content",
          alignItems: "center",
          flexDirection: "column",
          flexGrow: 1,
        },
      })}
    >
      <Box
        sx={theme => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          width: "100%",
          flexShrink: "0",
          [theme.breakpoints.down("md")]: {
            width: "300px",
          },
          [theme.breakpoints.up("md")]: {
            width: "400px",
            height: "100%",
          },
          [theme.breakpoints.down("sm")]: {
            maxWidth: "90vw"
          },
        })}
      >
        {/* We use this to get rid of unwanted  GET http://localhost:3001/undefined 404 (Not Found)  requests when product is undefined*/}
        {!!imgSrcBig && !!imgSrcSmall ? (
          <img
            alt={product.name}
            srcSet={`
                ${imgSrcBig} 400w,
                ${imgSrcSmall} 300w
              `}
            sizes={`
                (max-width: ${theme.breakpoints.values.sm - 1}px) 300px,
                (min-width: ${theme.breakpoints.values.sm - 1}px) 400px,                
              `}
            style={{
              maxWidth: "400px",
              width: "100%",
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
              [theme.breakpoints.down("sm")]: {
                height: 300,
                width: 300,
              },
            })}
          />
        )}
      </Box>
      <Box
        sx={theme => ({
          width: "100%",
          [theme.breakpoints.up("md")]: {
            flexGrow: "1",
          },
          [theme.breakpoints.down("sm")]: {
            maxWidth: "90vw"
          },
        })}
      >
        <ProductDetailsComponent
          product={product}
          onProductAddedToBasket={onProductAddedToBasket}
        />
      </Box>
    </Box>
  );
};

export default ProductTemplatePage;
