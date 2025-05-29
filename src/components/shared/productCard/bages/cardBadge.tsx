import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { BsCartCheck } from "react-icons/bs";

const CardBadge = ({ productId }: { productId: string }) => {
  const inLogin = useAuthStore((state) => state.isLogin);
  const cartItems = useCardStore((state) =>
    inLogin ? state.onlineCart.cartItems : state.storeCart.cartItems
  );

  const isExist = cartItems.find(
    (item) =>
      item.productId === productId || String(item.productId) === productId
  );

  if (!isExist?.id) return null;
  return (
    <Tooltip title="Product is in Your cart">
      <Link href={"/cart"}>
        <div
          className={
            "bg-green-500 text-white  rounded-full h-6 w-6  flex items-center justify-center !font-bold"
          }
        >
          <Badge
            color="blue"
            size="small"
            count={isExist?.quantity}
            offset={[5, -4]}
          >
            <BsCartCheck className="!text-white" />
          </Badge>
        </div>
      </Link>
    </Tooltip>
  );
};

export default CardBadge;
