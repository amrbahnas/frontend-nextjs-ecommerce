import { useAddProductToCart } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Button, ButtonProps, Tooltip } from "antd";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { MdAddShoppingCart } from "react-icons/md";
import { useTranslations } from "next-intl";
import resSanatize from "@/services/sanatizeApiRes";

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
  const { id, colors = [], availableSizes = [], quantity, price } = product;
  const isLogin = useAuthStore((state) => state.isLogin);
  const { addProduct, isPending } = useAddProductToCart();
  const { addCartItem, setOnlineCart, storeCart, onlineCart } = useCardStore();

  const t = useTranslations("AddToCart");

  const cartItemCount = useMemo(() => {
    return (
      (isLogin ? onlineCart.cartItems : storeCart.cartItems).find(
        (item) => item.productId === id
      )?.quantity || -1
    );
  }, [isLogin, onlineCart, storeCart]);

  const noAvailableStock = useMemo(() => {
    return quantity === 0 || cartItemCount === quantity - 1;
  }, [quantity, cartItemCount]);

  const commonOptions: ButtonProps = useMemo(
    () => ({
      type: buttonStyle?.buttonType || "default",
      size: buttonStyle?.buttonSize || "middle",
      className: `!w-32 !py-4 ${buttonStyle?.buttonClassName}`,
      shape: "default",
      icon: <MdAddShoppingCart />,
      disabled: noAvailableStock || disabled || isPending,
    }),
    [
      buttonStyle?.buttonType,
      buttonStyle?.buttonSize,
      buttonStyle?.buttonClassName,
      cartItemCount,
      disabled,
      isPending,
    ]
  );

  const handleAddToCart = async () => {
    try {
      if (isLogin) {
        await addProduct(
          {
            productId: id,
            color: productOptions.color,
            quantity: productOptions.quantity,
            size: productOptions.size,
          },
          {
            onSuccess: (res) => {
              try {
                const cart = resSanatize(res);
                setOnlineCart({
                  id: cart?.id || "",
                  cartItems: cart?.cartItems || [],
                  totalCartPrice: cart?.totalCartPrice || 0,
                });

                successToast();
              } catch (error: any) {
                toast.error(t("errorMessage"));
              }
            },
          }
        );
      } else {
        addCartItem({
          productId: id,
          availableQuantity: quantity,
          quantity: productOptions.quantity,
          price: price * productOptions.quantity,
          color: productOptions.color || colors[0],
          size: productOptions.size || availableSizes[0],
          id: id,
          imageCover: product.imageCover,
        });

        successToast();
      }
    } catch (error) {
      toast.error(t("errorMessage"));
    }
  };

  return (
    <Tooltip title={noAvailableStock && "No stock available for this product"}>
      <Button {...commonOptions} onClick={handleAddToCart} loading={isPending}>
        {t("buttonLabel")}
      </Button>
    </Tooltip>
  );
};

export default AddProductToCard;
const successToast = () => {
  toast.success(
    <div>
      Product added to cart
      <Link
        href="/cart"
        className="!text-blue-500 !underline !ml-2 !font-semibold"
      >
        View Cart
      </Link>
    </div>,
    {
      position: "bottom-center",
      className: "mb-10",
      duration: 3000,
    }
  );
};
