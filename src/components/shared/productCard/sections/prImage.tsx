import NextImage from "@/components/ui/nextImage";
import React from "react";

const PrImage = ({ imageCover }: { imageCover: string }) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        src={imageCover || "/product.png"}
        alt=""
        fill
        sizes="25vw"
        className="object-cover rounded-lg "
        priority // for avoid Largest Contentful Paint (LCP) issue
      />
    </div>
  );
};

export default PrImage;
