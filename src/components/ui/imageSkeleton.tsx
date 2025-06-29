import Image from "next/image";
import React from "react";

const ImageSkeleton = () => {
  return (
    <Image
      src="/image-placeholder.jpg"
      alt="skeleton"
      fill
      className="object-cover"
    />
  );
};

export default ImageSkeleton;
