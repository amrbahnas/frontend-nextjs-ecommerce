import { Button, Tooltip } from "antd";
import React from "react";

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
  return (
    <Tooltip title={!!invalidCart ? invalidCart.message : ""}>
      <Button
        loading={isLoading}
        size={size}
        disabled={isLoading || !!invalidCart}
        onClick={handleCheckout}
        className=" !py-5  !bg-black/90  !border-none !text-white disabled:cursor-not-allowed !disabled:opacity-75 w-full"
      >
        Checkout
      </Button>
    </Tooltip>
  );
};

export default CheckButton;
