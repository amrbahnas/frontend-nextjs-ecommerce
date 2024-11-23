import { useAddProductToCart } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Button, ButtonProps, Tooltip } from "antd";
import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

type ButtonStyleType = {
  buttonClassName?: string;
  buttonSize?: "small" | "middle" | "large";
  buttonType?: "primary" | "default" | "dashed" | "link" | "text";
};

type ProductOptionsType = {
  color: string;
  size: ProductSize;
  quantity: number;
};

const AddProductToCard = ({
  product,
  disabled,
  buttonStyle,
  productOptions,
}: {
  product: Product;
  disabled?: boolean;
  buttonStyle?: ButtonStyleType;
  productOptions: ProductOptionsType;
}) => {
  const { _id, colors, availableSizes, quantity, price } = product;
  const isLogin = useAuthStore((state) => state.isLogin);
  const { addProduct, isPending } = useAddProductToCart();
  const { addCartItem, increaseCartItemsCount, setCartItemsCount } =
    useCardStore();

  const commonOptions: ButtonProps = React.useMemo(
    () => ({
      type: buttonStyle?.buttonType || "default",
      size: buttonStyle?.buttonSize || "middle",
      className: `!w-32 !py-4 ${buttonStyle?.buttonClassName}`,
      shape: "default",
      icon: <MdAddShoppingCart />,
      disabled: quantity === 0 || disabled || isPending,
    }),
    [
      buttonStyle?.buttonType,
      buttonStyle?.buttonSize,
      buttonStyle?.buttonClassName,
      quantity,
      disabled,
      isPending,
    ]
  );

  if (isLogin) {
    return (
      <Tooltip title={quantity === 0 && "No stock available for this product"}>
        <Button
          {...commonOptions}
          onClick={(e) => {
            addProduct(
              {
                productId: _id,
                color: productOptions.color,
                quantity: productOptions.quantity,
                size: productOptions.size,
              },
              {
                onSuccess: (res) => {
                  console.log("🚀 ~ res:", res);
                  const cartItemsCount = res.data.cartItemsCount;
                  setCartItemsCount(cartItemsCount);
                  toast.success("Product added to cart");
                },
              }
            );
          }}
          loading={isPending}
        >
          Add to Cart
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={quantity === 0 && "No stock available for this product"}>
      <Button
        {...commonOptions}
        onClick={() => {
          const isExist = addCartItem({
            product: product,
            quantity: productOptions.quantity,
            price: price * productOptions.quantity,
            color: productOptions.color || colors[0],
            size: productOptions.size || availableSizes[0],
            _id,
          });
          if (!isExist) increaseCartItemsCount();
          toast.success("Product added to cart");
        }}
      >
        Add to Cart
      </Button>
    </Tooltip>
  );
};

export default AddProductToCard;
