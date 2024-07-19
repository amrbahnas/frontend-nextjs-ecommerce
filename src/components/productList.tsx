import { Button, Input, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "../../hooks/useQuery";
import { Product } from "../../types/product";
import useMutation from "../../hooks/useMutation";
import { toast } from "react-toastify";
import { useState } from "react";

const ProductList = ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const { data: products, isLoading } = useQuery("/products", {
    params: {
      fields: "title,price,imageCover,images",
      category,
      search,
    },
    initialData: [],
  });

  if (products?.length === 0)
    return (
      <p className="text-center text-2xl font-semibold mt-12">
        No products found
      </p>
    );

  return (
    <Spin spinning={isLoading}>
      <div
        className={`mt-12 gap-x-9 gap-y-16 items-center grid ${
          products?.length > 2 ? "grid-cols-autoFit" : ""
        }`}
      >
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </Spin>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const { mutate: addProduct, isPending } = useMutation(`/cart`);
  return (
    <Link
      href={"/" + product._id}
      className=" flex flex-col gap-4 w-full  md:w-1/4 "
      key={product._id}
    >
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
      <div className="flex justify-between">
        <span className="font-medium">{product.title}</span>
        <span className="font-semibold">${product.price}</span>
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault();
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
    </Link>
  );
};

export default ProductList;
