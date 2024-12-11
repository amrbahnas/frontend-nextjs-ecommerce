import CheckButton from "@/components/cart/checkButton";
import { Button, Tooltip } from "antd";
import Link from "next/link";
import React, { memo } from "react";

const CartActionsBTN = ({
  isLoading,
  handleCheckout,
  setOpen,
  invalidCart,
}: {
  isLoading: boolean;
  handleCheckout: () => void;
  setOpen: (value: boolean) => void;
  invalidCart: null | { status: string; message: string };
}) => {
  return (
    <div className="flex  items-center gap-1 text-sm">
      <CheckButton
        isLoading={isLoading}
        handleCheckout={handleCheckout}
        invalidCart={invalidCart}
      />
      <Link href="/cart">
        <Button onClick={() => setOpen(false)} className="!py-5">
          View Cart
        </Button>
      </Link>
    </div>
  );
};

export default memo(CartActionsBTN);
