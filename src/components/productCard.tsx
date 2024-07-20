import { useAddProductToCart } from "@/api/actions";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { Product } from "../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const { addProduct, isPending } = useAddProductToCart();
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
      <Button
        onClick={(e) => {
          addProduct(
            {
              productId: product._id,
              color: product?.colors?.length ? product.colors[0] : "black",
            },
            {
              onSuccess: () => {
                toast.success("Product added to cart");
              },
            }
          );
        }}
        size="middle"
        className="!w-32 !py-4"
        shape="round"
        disabled={isPending}
        loading={isPending}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
