import React from "react";
import { Button as MUIButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type IProps = {
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  title: string | React.ReactNode | React.ReactNode[];
  onPressEnter?: () => void;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  loading?: boolean;
  sx?: Object;
};

export const Button = ({
  variant = "contained",
  disabled,
  onClick,
  title,
  size = "medium",
  fullWidth,
  onPressEnter,
  color,
  sx,
  loading
}: IProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        if (onPressEnter) {
          onPressEnter();
        }
        break;
      default:
    }
  };
  return (
    <LoadingButton
      loading={loading}
      color={color}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      size={size}
      fullWidth={fullWidth}
      onKeyDown={handleKeyPress}
      sx={sx}
    >
      {title}
    </LoadingButton>
  );
};
