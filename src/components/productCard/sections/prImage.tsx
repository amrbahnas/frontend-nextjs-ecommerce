import NextImage from "@/components/ui/nextImage";
import React from "react";

const PrImage = ({ imageCover }: { imageCover: string }) => {
  return (
    <div className="relative w-full h-40 md:h-60 overflow-hidden ">
      <NextImage
        src={imageCover || "/product.png"}
        alt=""
        fill
        sizes="25vw"
        className=" object-contain rounded-lg "
        priority // for avoid Largest Contentful Paint (LCP) issue
      />
    </div>
  );
};

export default PrImage;
