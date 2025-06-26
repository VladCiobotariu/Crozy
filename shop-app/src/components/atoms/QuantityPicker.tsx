import Box from "@mui/joy/Box";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

type IProps = {
  onQuantityChanged?: (quantity: number) => void;
  quantity?: number;
  label?: string;
};

const QuantityPicker = ({ onQuantityChanged, quantity = 1, label }: IProps) => {

  const onIncrementClick = () => {
    const newQuantity = quantity + 1;
    if (onQuantityChanged) {
      onQuantityChanged(newQuantity);
    }
  };

  const onDecrementClick = () => {
    const newQuantity = quantity - 1;
    if (onQuantityChanged) {
      onQuantityChanged(newQuantity);
    }
  };

  return (
    <Box>
      {label && <Typography level="body-md">{label}</Typography>}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton onClick={onDecrementClick} variant="outlined"  disabled={quantity <= 1}>
          <RemoveIcon />
        </IconButton>
        <Typography sx={{
          display: "flex",
          justifyContent: "center",
          width: "2ch",
        }}>
          {quantity}
        </Typography>
        <IconButton onClick={onIncrementClick} variant="outlined">
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default QuantityPicker;
