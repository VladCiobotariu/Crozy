import React from "react";
import useResponsiveImage from "../../../hooks/useResponsiveImage";
import Image from "next/image";
import { Popover, styled } from "@mui/material";

type GridDataImageProps = {
  src: string;
  widthHeightForImage: number;
  usePopover?: boolean;
  widthHeightForPopoverImage?: number;
  anchorOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" } 
  transformOrigin?: { vertical: "top" | "center" | "bottom"; horizontal: "left" | "center" | "right" } 
};

const CustomPopover = styled(Popover)`
  .MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
  }
`;

const ImageDisplay = ({
                        src,
                        widthHeightForImage,
                        usePopover = false,
                        widthHeightForPopoverImage = 200,
                        anchorOrigin = { vertical: "bottom", horizontal: "center" },
                        transformOrigin = { vertical: "top", horizontal: "left" },
                      }: GridDataImageProps) => {
  const downloadSize = Math.max(widthHeightForPopoverImage, widthHeightForImage);
  const imgSrc = useResponsiveImage({
    src: src,
    width: downloadSize,
    height: downloadSize
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return imgSrc && (
    <>
      <Image
        src={imgSrc}
        alt={src}
        width={widthHeightForImage}
        height={widthHeightForImage}
        style={{
          borderRadius: "0.25rem",
          filter: usePopover && open ? "blur(1px)" : "none"
        }}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseOver={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      {usePopover && (
        <CustomPopover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          onClose={handlePopoverClose}
        >
          <Image
            src={imgSrc}
            alt={src}
            width={widthHeightForPopoverImage}
            height={widthHeightForPopoverImage}
            style={{borderRadius: "0.25rem"}}
          />
        </CustomPopover>
      )}
    </>
  );
};
export default ImageDisplay;
