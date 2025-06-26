import React, { useEffect, useState } from "react";
import { styled } from "@mui/material";

type IProps = {
  src?: string | undefined;
  alt?: string;
  sx?: any;
};

const StyledImageViewer = styled("img")(() => ({
  objectFit: "cover",
  transition: "all .3s ease",
  height: 150,
  width: 150,
}));

export const ImageViewer = ({ src, alt, sx }: IProps) => {
  const placeholderSrcUrl = src ? new URL(`50/50/`, src + "/") : undefined;
  const targetSrcUrl = src ? new URL(`200/200/`, src + "/") : undefined;
  const [imgSrc, setImgSrc] = useState<string | undefined>(placeholderSrcUrl?.toString());

  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    if (targetSrcUrl) {
      const img = new Image();
      const targetSrc = targetSrcUrl.toString();
      img.src = targetSrc;
      img.onload = () => {
        setImgSrc(targetSrc);
      };
    }
  }, [src, targetSrcUrl]);

  return src ? (
    <StyledImageViewer
      className={"ZoomImage"}
      loading="lazy"
      src={imgSrc}
      alt={alt}
      sx={sx}
    />
  ) : null;
};
