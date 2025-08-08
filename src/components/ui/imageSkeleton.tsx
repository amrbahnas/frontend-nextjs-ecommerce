import Image from "next/image";
import React from "react";

const ImageSkeleton = () => {
  return (
    <Image
      src="/image-placeholder.png"
      alt="skeleton"
      fill
      className="object-cover dark:invert"
    />
  );
};

export default ImageSkeleton;
