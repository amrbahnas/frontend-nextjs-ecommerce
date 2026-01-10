import NextImage from "@/components/ui/nextImage";
import React from "react";

type PrImageProps = {
  imageCover: string;
  title?: string;
};

const PrImage = ({ imageCover, title = "Product image" }: PrImageProps) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        src={imageCover || "/product.png"}
        alt={title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  );
};

export default PrImage;
