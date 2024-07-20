import { useAddProductToCart } from "@/api/actions";
import { Product } from "@/types/product";
import { Button } from "antd";
import React from "react";
import { toast } from "react-toastify";

const AddProductToCard = ({ product }: { product: Product }) => {
  const { addProduct, isPending } = useAddProductToCart();

  return (
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
  );
};

export default AddProductToCard;
