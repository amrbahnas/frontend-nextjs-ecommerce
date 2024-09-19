import { useGetCart } from "@/api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Popover, Radio } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import CartBody from "./cartBody";

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, cartItemsCount } = useCardStore();

  const {
    cart: apiCart,
    isLoading,
    refetch,
  } = useGetCart({
    skip: !isLogin || !open,
  });

  const renderedCart = isLogin ? apiCart : storeCart;

  useEffect(() => {
    if (open && isLogin) refetch();
  }, [open, isLogin, refetch]);

  return (
    <Popover
      open={open}
      onOpenChange={() => setOpen(!open)}
      content={
        <CartBody
          isLoading={isLoading}
          refetch={refetch}
          cart={renderedCart}
          setOpen={setOpen}
        />
      }
      trigger="click"
    >
      <Badge count={cartItemsCount} size="small" className=" cursor-pointer">
        <Image
          src="/cart.png"
          width={22}
          height={22}
          alt="cart"
          className="cursor-pointer"
        />
      </Badge>
    </Popover>
  );
};

export default CartModal;
