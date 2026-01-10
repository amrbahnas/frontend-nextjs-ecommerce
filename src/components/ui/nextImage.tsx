"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import ImageSkeleton from "./imageSkeleton";

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
  loading = "lazy",
  ...props
}: React.ComponentProps<typeof Image>) => {
  if (!src) {
    return <ImageSkeleton />;
  }
  return (
    <Image
      src={validateSrc(src)}
      alt={alt}
      loading={props.priority ? undefined : loading}
      {...props}
    />
  );
};

export default NextImage;
