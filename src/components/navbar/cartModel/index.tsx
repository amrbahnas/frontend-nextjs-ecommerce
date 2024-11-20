import { useGetCart } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Popover, Radio } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import CartBody from "./cartBody";
import NextImage from "@/components/ui/nextImage";
import CartSkeleton from "./cart.skeleton";
import { IoCartOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { PiShoppingCartThin } from "react-icons/pi";

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
        isLoading ? (
          <CartSkeleton />
        ) : (
          <CartBody refetch={refetch} cart={renderedCart} setOpen={setOpen} />
        )
      }
      trigger="click"
    >
      <Badge
        count={cartItemsCount}
        size="small"
        className=" cursor-pointer"
        color="blue"
      >
        <PiShoppingCartThin size={25} />
      </Badge>
    </Popover>
  );
};

export default CartModal;
