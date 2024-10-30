import { useAddProductToCart } from "@/api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Button, ButtonProps } from "antd";
import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

type OptionsType = {
  color: string;
  size?: ProductSize;
  quantity: number;
  buttonClassName?: string;
  buttonSize?: "small" | "middle" | "large";
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
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

  const commonOptions: ButtonProps = React.useMemo(
    () => ({
      type: options.buttonType || "default",
      size: options.buttonSize || "middle",
      className: `!w-32 !py-4 ${options.buttonClassName}`,
      shape: "default",
      icon: <MdAddShoppingCart />,
    }),
    [options.buttonType, options.buttonSize, options.buttonClassName]
  );

  if (isLogin) {
    return (
      <Button
        {...commonOptions}
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
        disabled={isPending}
        loading={isPending}
      >
        Add to Cart
      </Button>
    );
  }

  return (
    <Button
      {...commonOptions}
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
