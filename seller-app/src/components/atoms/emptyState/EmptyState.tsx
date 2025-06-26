import React from "react";
import { styled } from "@mui/material";

type EmptyStateProps = {
  children: React.ReactElement | React.ReactElement[];
};

const EmptyStateContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  width: "100%",
  border: `1px dashed ${theme.palette.colors.borders.N200}`,
  borderTop: "unset",
  height: 500,
  backgroundColor: theme.palette.colors.N100,
}));

export const EmptyStateContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  fontSize: 26,
  color: theme.palette.colors.borders.N200,
}));

export const EmptyState = ({ children }: EmptyStateProps) => {
  return (
    <EmptyStateContainer>
      <EmptyStateContent>{children}</EmptyStateContent>
    </EmptyStateContainer>
  );
};
