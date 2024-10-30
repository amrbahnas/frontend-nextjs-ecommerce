import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const validateSrc = (src: string | StaticImport) => {
  if (typeof src === "string") {
    if (src.startsWith("/") || src.startsWith("http")) {
      return src;
    }
    return `/${src}`;
  }
  return src;
};

const NextImage = ({
  src,
  alt = "image",
  ...props
}: React.ComponentProps<typeof Image>) => {
  return <Image src={validateSrc(src)} alt={alt} {...props} />;
};

export default NextImage;
