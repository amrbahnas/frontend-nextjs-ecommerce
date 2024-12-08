import { Button } from "antd";
import Link from "next/link";
import React, { memo } from "react";

const CartActionsBTN = ({
  isLoading,
  handleCheckout,
  setOpen,
}: {
  isLoading: boolean;
  handleCheckout: () => void;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <div className="flex  items-center gap-1 text-sm">
      <Button
        loading={isLoading}
        disabled={isLoading}
        onClick={handleCheckout}
        className=" !py-5  !bg-black/90 hover:scale-105 !border-none !text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
      >
        Checkout
      </Button>
      <Link href="/cart">
        <Button onClick={() => setOpen(false)} className="!py-5">
          View Cart
        </Button>
      </Link>
    </div>
  );
};

export default memo(CartActionsBTN);
