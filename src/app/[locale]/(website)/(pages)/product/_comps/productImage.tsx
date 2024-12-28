"use client";
import NextImage from "@/components/ui/nextImage";
import classNames from "classnames";
import { memo, useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[width, height], setSize] = useState([0, 0]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const elem = e.currentTarget;
    const { left, top } = elem.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setXY([x, y]);
  };

  return (
    <div className="flex gap-6 flex-col md:flex-row-reverse w-full">
      <div className="flex-1 relative w-full h-[300px] md:h-[500px] rounded-md ">
        <div
          className="relative w-full h-full cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={images[index]}
            alt="Product"
            className="w-full h-full object-cover rounded-md"
          />

          {showMagnifier && (
            <>
              {/* Cursor magnifier */}
              <div
                style={{
                  position: "absolute",
                  left: x - 50,
                  top: y - 50,
                  width: "100px",
                  height: "100px",
                  border: "2px solid #fff",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  cursor: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 2,
                }}
              />
              {/* Side magnified view */}
              <div
                style={{
                  position: "absolute",
                  left: `calc(100% + 20px)`,
                  top: "50%",
                  width: "400px",
                  height: "400px",
                  border: "1px solid #ddd",
                  background: "white",
                  borderRadius: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  pointerEvents: "none",
                  overflow: "hidden",
                  zIndex: 999,
                }}
              >
                <img
                  src={images[index]}
                  style={{
                    position: "absolute",
                    left: `${(-x * 200) / width}%`,
                    top: `${(-y * 200) / height}%`,
                    transform: "scale(3)",
                    transformOrigin: "top left",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                  }}
                  alt="Magnified view"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {images.length > 2 && (
        <div className="flex flex-row md:flex-col gap-4 w-full md:w-32 flex-shrink-0">
          {images.map((item: string, i: number) => (
            <div
              className={classNames(
                "w-full h-28 relative gap-4 cursor-pointer rounded-md overflow-hidden",
                {
                  "border-2 border-primary": i === index,
                }
              )}
              key={item}
              onClick={() => setIndex(i)}
            >
              <NextImage
                src={item}
                alt=""
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ProductImages);
