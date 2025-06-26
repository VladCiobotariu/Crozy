import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from '@mui/icons-material/Paid';
import CachedIcon from "@mui/icons-material/Cached";
import { Box, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from '@mui/system';
import { OrderState } from "@/gql/graphql";

type OrderStatusIconProps = {
  orderStatus: OrderState;
};

export const convertOrderStatusToDisplayedText = (orderState: OrderState) => {
  switch (orderState) {
    case OrderState.AwaitingPayment:
      return "Așteptare Plată";
    case OrderState.Canceled:
      return "Anulată";
    case OrderState.Completed:
      return "Finalizată";
    case OrderState.Delivering:
      return "Livrare";
    case OrderState.Draft:
      return "Draft";
    case OrderState.Processing:
      return "Procesare";
    default: throw Error(`OrderState unnsuported: ${orderState}`)
  }
};

const OrderStatusIcon = ({orderStatus}: OrderStatusIconProps) => {

  const theme = useTheme();
  const isExtraSmallSize = useMediaQuery(theme.breakpoints.down(360));

  const icon: React.JSX.Element = (() => {
    switch (orderStatus) {
      case OrderState.Canceled:
        return <CancelIcon color="error"/>;
      case OrderState.Completed:
        return <CheckCircleIcon color="success" />;
      case OrderState.AwaitingPayment:
        return <PaidIcon color="success"/>;
      case OrderState.Processing:
        return <CachedIcon color="warning"/>;
      case OrderState.Delivering:
        return <DeliveryDiningIcon color="primary"/>;
      case OrderState.Draft:
        return <InfoIcon color="info"/>;
      default:{
        return <CheckCircleIcon color="success" />;
      }
    }
  })();
  return (
    <Box sx={theme=>({
      display: "flex",
      flexDirection: "row",
      gap: theme.spacing(1),
      alignItems: "flex-start",
    })}>
      {icon}
      {!isExtraSmallSize &&
        <Typography level="body-md">
          {convertOrderStatusToDisplayedText(orderStatus)}
        </Typography>
      }
    </Box>
  );
};

export default OrderStatusIcon;
