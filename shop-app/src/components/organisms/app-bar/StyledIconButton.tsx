import React, { MouseEventHandler } from "react";
import { Button, Typography } from "@mui/joy";

type IProps = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
};

const StyledIconButtonStyle = {
  borderRadius: 15,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const StyledIconButton = ({ children, icon, onClick }: IProps) => (
  <Button sx={StyledIconButtonStyle} onClick={onClick}>
    {icon} <Typography level="title-sm">{children}</Typography>
  </Button>
);

export default StyledIconButton;
