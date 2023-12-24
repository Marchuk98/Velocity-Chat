import { ImgHTMLAttributes, useEffect, useState } from "react";
import { BlurhashCanvas as ImportedBlurHashCanvas } from "react-blurhash";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  blurHeight: number;
  blurWidth: number;
  src: string;
}

export const BlurHashCanvas = ({
  alt,
  blurHeight,
  blurWidth,
  src,
  ...props
}: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);

  return (
    <>
      <div
        style={{ display: imageLoaded ? "none" : "inline" }}
      >
        <ImportedBlurHashCanvas
          hash={"L37nC1M_00s?-BaepJX50cog^nWA"}
          height={blurHeight}
          punch={1}
          style={{ borderRadius: "2px" }}
          width={blurWidth}
        />
      </div>
      <div style={{ display: !imageLoaded ? "none" : "inline" }}>
        <img alt={alt} src={src} {...props} />
      </div>
    </>
  );
};
