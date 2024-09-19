import { useAddProductToCart } from "@/api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Button } from "antd";
import React from "react";
import { toast } from "react-toastify";

enum CartStatus {
  Login = "login",
  Guest = "guest",
}

type OptionsType = {
  color: string;
  size?: ProductSize;
  quantity: number;
};

const AddProductToCard = ({
  product,
  options,
}: {
  product: Product;
  options: OptionsType;
}) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { addProduct, isPending } = useAddProductToCart();
  const { addCartItem, increaseCartItemsCount, setCartItemsCount } =
    useCardStore();

  if (isLogin) {
    return (
      <Button
        onClick={(e) => {
          addProduct(
            {
              productId: product._id,
              color: options.color,
              quantity: options.quantity,
            },
            {
              onSuccess: (res) => {
                const cartItemsCount = res.data.cartItemsCount;
                setCartItemsCount(cartItemsCount);
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
  }

  return (
    <Button
      size="middle"
      className="!w-32 !py-4"
      shape="round"
      onClick={() => {
        const isExist = addCartItem({
          product: product,
          quantity: options.quantity,
          price: product.price * options.quantity,
          color: options.color || product.colors[0],
          _id: product._id,
        });
        if (!isExist) increaseCartItemsCount();
        toast.success("Product added to cart");
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddProductToCard;
