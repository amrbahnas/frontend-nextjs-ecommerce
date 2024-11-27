"use client";
import NextImage from "@/components/ui/nextImage";
import { Image } from "antd";
import classNames from "classnames";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className=" flex gap-6 flex-col md:flex-row-reverse w-full">
      <div className="flex-1 relative w-full h-[300px] md:h-[500px] rounded-md overflow-hidden">
        <Image
          src={images[index]}
          alt="Product Image"
          width={"100%"}
          height={"100%"}
          className=" !object-cover"
        />
      </div>
      {images.length > 2 && (
        <div className="flex flex-row md:flex-col gap-4 w-full  md:w-32  flex-shrink-0">
          {images.map((item: any, i: number) => (
            <div
              className={classNames(
                "w-full h-28 relative gap-4  cursor-pointer rounded-md overflow-hidden ",
                {
                  "border-2 border-primary": i === index,
                }
              )}
              key={item.id}
              onClick={() => setIndex(i)}
            >
              <NextImage
                src={item}
                alt=""
                fill
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
