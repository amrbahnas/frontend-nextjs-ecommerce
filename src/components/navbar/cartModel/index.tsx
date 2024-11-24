import { useGetCart } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Popover } from "antd";
import { useEffect, useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import CartSkeleton from "./cart.skeleton";
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
