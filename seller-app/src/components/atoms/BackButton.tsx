"use client";

import React from "react";
import { Button, Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

type IProps = {
  href?: string;
  sx?: any;
};

const BackButton = ({ href, sx }: IProps) => {
  const router = useRouter();
  return (
    <Button variant="contained" onClick={() => href ? router.push(href) : router.back()} startIcon={<ArrowBackIcon />}>
      Back
    </Button>
  );
};

export default BackButton;
