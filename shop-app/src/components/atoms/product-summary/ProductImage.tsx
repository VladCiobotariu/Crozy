import AspectRatio from "@mui/joy/AspectRatio";
import React from "react";
import useResponsiveImage from "../../../hooks/useResponsiveImage";
import { SxProps } from "@mui/system";
import { Box, Theme } from "@mui/joy";

type IProps = {
  src: string | undefined;
  productName: string | undefined;
  sx?: SxProps<Theme>;
};

const ProductImage = ({ src: originalUrl, productName, sx = [] }: IProps) => {
  const src = useResponsiveImage({ src: originalUrl, width: 200, height: 200 });
  return (
    <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <AspectRatio
        ratio="1/1"
        objectFit="cover"
        sx={
          {
            flexBasis: `500px`,
            justifySelf: "start",
            borderRadius: "sm",
            overflow: "auto",
            width: "100px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }
          }
      >
        <img src={src} alt={productName} />
      </AspectRatio>
    </Box>
  );
};

export default ProductImage;
