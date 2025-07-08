import { Button, Tooltip } from "antd";
import React from "react";
import { useTranslations } from "next-intl";

const CheckButton = ({
  isLoading,
  handleCheckout,
  invalidCart,
  size = "middle",
}: {
  isLoading: boolean;
  handleCheckout: () => void;
  invalidCart: null | { status: string; message: string };
  size?: "large" | "middle" | "small";
}) => {
  const t = useTranslations("Cart.actions");

  return (
    <Tooltip title={!!invalidCart ? invalidCart.message : ""}>
      <Button
        loading={isLoading}
        size={size}
        disabled={isLoading || !!invalidCart}
        onClick={handleCheckout}
        className=" !py-5  !bg-primary hover:!bg-primary/80  !border-none !text-white disabled:cursor-not-allowed !disabled:opacity-75 w-full"
      >
        {t("checkout")}
      </Button>
    </Tooltip>
  );
};

export default CheckButton;
