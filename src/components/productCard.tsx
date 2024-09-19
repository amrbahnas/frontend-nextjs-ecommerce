import Image from "next/image";
import Link from "next/link";

import AddProductToCard from "./addProductToCard";

const ProductCard = ({ product }: { product: Product }) => {
  console.log("🚀 ~ ProductCard ~ product:", product);
  return (
    <div className=" flex flex-col gap-4 w-full  md:w-1/4 ">
      <Link href={"/product/" + product._id} key={product._id}>
        <div className="relative w-full h-80">
          <Image
            src={product?.imageCover || "/product.png"}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          {product.images[0] && (
            <Image
              src={product.images[0] || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-medium">{product.title}</span>
          <span className="font-semibold">${product.price}</span>
        </div>
      </Link>
      <AddProductToCard
        product={product}
        options={{ color: product.colors[0], quantity: 1 }}
      />
    </div>
  );
};

export default ProductCard;
