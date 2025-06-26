import { Money } from "@/gql/graphql";
import useResponsiveImage from "@/hooks/useResponsiveImage";
import TotalItemPrice from "@moleculas/TotalItemPrice";
import TotalItemQuantity from "@moleculas/TotalItemQuantity";
import ExtraOptionsNames from "@moleculas/order-summary/ExtraOptionsName";
import { Box, Button, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/system";
import Link from "next/link";

export type ExtraOptionDetails = {
  id: string
  name: string
}

type OrderItemSlotProps = {
  productExtraOptions: ExtraOptionDetails[]
  productId: string | null | undefined;
  productName: string;
  totalProductPrice: Money;
  productImageUrl: string | undefined;
  quantity: number;
  productLink: string;
  showBuyAgainButton?: boolean;
};

const OrderItemSlot = ({
  productExtraOptions,
  productId,
  productName,
  totalProductPrice,
  productImageUrl,
  quantity,
  productLink,
  showBuyAgainButton = true,
}: OrderItemSlotProps) => {
  const theme = useTheme();

  const imgSrcSmall = useResponsiveImage({ src: productImageUrl, width: 150, height: 150 });
  const imgSrcBig = useResponsiveImage({ src: productImageUrl, width: 200, height: 200 });

  const isMediumSize = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallScren = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={theme => ({
      display: "flex",
      width: "100%",
      padding: {
        xs: theme.spacing(1),
        sm: theme.spacing(1),
        md: theme.spacing(2),
        lg: theme.spacing(4),
        xl: theme.spacing(4),
      },
      gap: {
        xs: theme.spacing(2),
        sm: theme.spacing(2),
        md: theme.spacing(4),
        lg: theme.spacing(4),
        xl: theme.spacing(4),
      },
    })}>
      <Box
        sx={theme => ({
          [theme.breakpoints.up('sm')]: {
            flexShrink: "0",        
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        })}
      >
        <Link
          href={`/${productLink}`}
          className={!productId ? 'disabled' : ''} 
          aria-disabled={!productId} 
          tabIndex={!productId ? -1 : undefined}
          style={{
            height: "100%",
            "pointerEvents": !productId ? 'none' : 'auto'
          }}
        >
          <img
            alt={productName}
            srcSet={`
                  ${imgSrcBig} 400w,
                  ${imgSrcSmall} 300w
                `}
            sizes={`
                  (max-width: ${theme.breakpoints.values.md - 1}px) 300px,
                  (min-width: ${theme.breakpoints.values.md - 1}px) 400px,                
                `}
            style={{
              maxWidth: "400px",
              width: "100%",
              borderRadius: "14px",
            }}
          />
        </Link>
      </Box>
      <Box sx={theme => ({
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1", 
        justifyContent: "space-between", 
        gap: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          flexShrink: "0",
          flexBasis: "0px",
        },
        [theme.breakpoints.down('md')]: {
          gap: theme.spacing(1),
        },
      })}>
        <Box sx={theme => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          [theme.breakpoints.down('md')]: {
            gap: theme.spacing(1),
          },
        })}>
          <Box sx={theme => ({
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            [theme.breakpoints.down('sm')]: {
              flexDirection: "column",
              gap: theme.spacing(1),
            },
          })}>
              <Typography level={isMediumSize ? "title-sm" : "title-md"} sx={theme => ({
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "2",
                [theme.breakpoints.up('sm')]: {
                  maxWidth: "75%",
                },
              })}>
                {productName}
              </Typography>
              <TotalItemQuantity variant="1digit" quantity={quantity} level={isMediumSize ? "title-sm" : "title-md"} sx={theme=>({
                [theme.breakpoints.down('sm')]: {
                  fontWeight: 500,
                },
              })}/>
          </Box>
          <ExtraOptionsNames productExtraOptions={productExtraOptions}/>
        </Box>
        <Box sx={theme=>({ 
          display: "flex",
          [theme.breakpoints.down('sm')]:{
            flexDirection: "row",
          },
          width: "100%", 
          justifyContent: !showBuyAgainButton ? "end" :  "space-between", 
          alignItems: "center", 
          mb: !showBuyAgainButton ? 1 : 0,
        })}>
          <TotalItemPrice level="title-md" dislayTotalText={false} boldedPrice={true} totalPrice={totalProductPrice}/>
          {showBuyAgainButton &&
            <>
              {!!productId?
                <Link href={`/${productLink}`}>
                  <Button variant="soft" sx={theme=>({
                    fontSize: "1rem",
                    [theme.breakpoints.up('md')]: {
                      px: theme.spacing(2.5),
                      py: theme.spacing(1.5),
                    },
                    [theme.breakpoints.down('md')]: {
                      fontSize: "0.75rem",
                      width: "fit-content",
                    },
                  })}>
                    Cumpără din nou
                  </Button>
                </Link> :
                <Button disabled>
                  Acest produs nu mai e valabil
                </Button>
              }
            </>
          }
        </Box>        
      </Box>
    </Box>
  );
};

export default OrderItemSlot;
