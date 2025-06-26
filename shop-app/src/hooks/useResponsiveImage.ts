import { useState, useEffect } from "react";

type IProps = {
  src: string | undefined;
  width: number | undefined;
  height: number | undefined;
};

function useImage({ src: originalImageUrl, width = 200, height = 200 }: IProps) {
  const placeholderSrcUrl = originalImageUrl
    ? new URL(`50/50/`, originalImageUrl + "/")
    : undefined;
  const targetSrcUrl = originalImageUrl
    ? new URL(`${width}/${height}/`, originalImageUrl + "/")
    : undefined;
  const [imgSrc, setImgSrc] = useState<string | undefined>(placeholderSrcUrl?.toString());

  useEffect(() => {
    if (targetSrcUrl) {
      const img = new Image();
      const targetSrc = targetSrcUrl.toString();
      img.src = targetSrc;
      img.onload = () => {
        setImgSrc(targetSrc);
      };
    }
    else {
      setImgSrc(undefined)
    }
  }, [originalImageUrl]);

  return imgSrc;
}

export default useImage;
