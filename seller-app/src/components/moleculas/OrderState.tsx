import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { OrderState, OrderStateDescription } from "../../generated/graphql";
import { Typography } from "../atoms";
import { LoadingButton } from "@mui/lab";

export type OrderStateProps = {
  orderStateDescription: OrderStateDescription,
  onStartProcessing: () => void;
  onCompleted: () => void;
  onCanceled: (reason: string) => void;
  loadingOrder: boolean;
  startOrderProcessingLoading: boolean,
  completeOrderLoading: boolean,
  cancelOrderLoading: boolean,
};

const OrderStateComponent = ({
  orderStateDescription: {orderState: currentState, stateChangeDescription},
  onStartProcessing,
  onCompleted,
  onCanceled,
  loadingOrder,
  startOrderProcessingLoading,
  completeOrderLoading,
  cancelOrderLoading,
}: OrderStateProps) => {
  const [cancelDialogOpen, setCancelDialogOpen] = React.useState(false);
  const [cancelationReason, setCancelationReason] = useState<string | undefined>();
  const theme = useTheme();

  const handleClose = () => {
    setCancelDialogOpen(false);
    setCancelationReason("");
  };

  const handleConfirm = () => {
    if (cancelationReason) {
      setCancelDialogOpen(false);
      onCanceled(cancelationReason);
      setCancelationReason("");
    }
  };

  const styleForOrderStateLabel = {
    display: "inline",
    fontWeight: "medium",
    fontSize: 18,
  };

  const styleForOrderState = {
    ...styleForOrderStateLabel,
    color: () => {
      switch (currentState) {
        case OrderState.Canceled:
          return theme.palette.error.main;
        case OrderState.Completed:
          return theme.palette.success.main; 
        default:
          return theme.palette.primary.main;
      }
    },
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {loadingOrder ? 
          <Box>
            <CircularProgress sx={theme=>({my: theme.spacing(3.2)})}/>
          </Box>
          :
          <>
            <Box sx={{ mb: 1 }}>
              <Typography sx={styleForOrderStateLabel}>Order state:{" "}</Typography>
              <Typography sx={styleForOrderState}>{currentState}</Typography>
            </Box>
            <Box sx={{display: "flex", gap: 1, mb: 3}}>
              {currentState === OrderState.Canceled && 
                (
                <Typography component={"span"} sx={{display: "inline",}}>
                  Reason:{" "} 
                  <Typography component={"span"} sx={{display: "inline", fontWeight: "light"}}>{stateChangeDescription}</Typography>
                </Typography>
                )
              }
              {currentState === OrderState.AwaitingPayment && (
                <LoadingButton loading={startOrderProcessingLoading} variant="outlined" color="primary" onClick={onStartProcessing}>
                  Start Processing
                </LoadingButton>
              )}
              {currentState === OrderState.Processing && (
                <LoadingButton loading={completeOrderLoading} variant="outlined" color="primary" onClick={onCompleted}>
                  Complete
                </LoadingButton>
              )}
              {(currentState === OrderState.AwaitingPayment || currentState === OrderState.Processing) && (
                <LoadingButton loading={cancelOrderLoading} variant="outlined" color="error" onClick={() => setCancelDialogOpen(true)}>
                  Cancel
                </LoadingButton>
              )}
            </Box>
          </>
        }
      </Box>
      <Dialog open={cancelDialogOpen} onClose={handleClose}>
        <DialogTitle>Cancel order confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm order cancelation and provide cancelation reason
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cancel-reason"
            label="Reason for canceling the order"
            fullWidth
            variant="standard"
            value={cancelationReason}
            onChange={e => setCancelationReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderStateComponent;
