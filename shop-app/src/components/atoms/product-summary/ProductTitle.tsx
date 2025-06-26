import Typography from "@mui/joy/Typography";
import React from "react";

type ProductTitleProps = {
  productName: string | undefined;
};

const ProductTitle = ({ productName }: ProductTitleProps) => {
  return (
    <Typography level="title-sm"
      sx={{
        justifySelf: "center",
      }}
    >
      {productName}
    </Typography>
  );
};

export default ProductTitle;
