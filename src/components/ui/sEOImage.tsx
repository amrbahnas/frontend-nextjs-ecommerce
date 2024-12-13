import Image from "next/image";
import { useState } from "react";

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const SEOImage = ({ src, alt, width, height, className, priority = false }: SEOImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`overflow-hidden ${isLoading ? "animate-pulse bg-gray-200" : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className || ""}`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default SEOImage;
