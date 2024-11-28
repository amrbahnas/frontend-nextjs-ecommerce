import NextImage from "@/components/ui/nextImage";
import React from "react";

const PrImage = ({ imageCover }: { imageCover: string }) => {
  return (
    <div className="relative w-full h-40 md:h-72 overflow-hidden">
      <NextImage
        src={imageCover || "/product.png"}
        alt=""
        fill
        sizes="25vw"
        className=" object-cover  md:object-cover"
      />
    </div>
  );
};

export default PrImage;
