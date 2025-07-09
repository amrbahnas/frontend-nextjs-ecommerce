import { useGetCart } from "@/_api/query";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Popover } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import CartSkeleton from "./cart.skeleton";
import CartBody from "./cartBody";

const CartModal = () => {
  const route = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, setOnlineCart, onlineCart } = useCardStore();
  const {
    cart: apiCart,
    isLoading,
    refetch,
  } = useGetCart({
    skip: !open,
  });

  const renderedCart = (isLogin ? apiCart : storeCart) as CartType;
  const cartCount = isLogin
    ? onlineCart.cartItems.length
    : storeCart.cartItems.length;

  useEffect(() => {
    if (open && isLogin) refetch();
  }, [open, isLogin]);

  useEffect(() => {
    if (apiCart.id && isLogin) {
      setOnlineCart({
        id: apiCart.id,
        cartItems: apiCart.cartItems,
        totalCartPrice: apiCart.totalCartPrice,
      });
    }
  }, [apiCart]);
  const onOpenChangeHandler = () => {
    if (pathName === "/cart") return;
    cartCount > 2 ? route.push("/cart") : setOpen(!open);
  };

  return (
    <Popover
      open={open}
      destroyOnHidden
      onOpenChange={onOpenChangeHandler}
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
        count={cartCount}
        size="small"
        className=" cursor-pointer"
        color="blue"
      >
        <PiShoppingCartThin size={25} className="hover:scale-105" />
      </Badge>
    </Popover>
  );
};

export default memo(CartModal);
