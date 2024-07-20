import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";
import AddProductToCard from "./addProductToCard";

const ProductCard = ({ product }: { product: Product }) => {
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
      <AddProductToCard product={product} />
    </div>
  );
};

export default ProductCard;
