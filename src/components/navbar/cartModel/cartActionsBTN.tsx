import CheckButton from "@/components/cart/checkButton";
import { Button, Tooltip } from "antd";
import Link from "next/link";
import React, { memo } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Cart");

  return (
    <div className="flex items-center gap-1 text-sm">
      <CheckButton
        isLoading={isLoading}
        handleCheckout={handleCheckout}
        invalidCart={invalidCart}
      />
      <Link href="/cart">
        <Button onClick={() => setOpen(false)} className="!py-5">
          {t("actions.viewCart")}
        </Button>
      </Link>
    </div>
  );
};

export default memo(CartActionsBTN);
