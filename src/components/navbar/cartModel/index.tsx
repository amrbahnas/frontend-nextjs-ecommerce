import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Badge, Popover } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { memo, useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import CartBody from "./cartBody";
import { useGetCartCount } from "@/_api/query";

const CartModal = () => {
  const route = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, onlineCart } = useCardStore();
  const { cartItemsCount } = useGetCartCount({
    skip: !isLogin || onlineCart.cartItems.length > 0,
  });
  const cartCount = isLogin
    ? onlineCart.cartItems.length || cartItemsCount
    : storeCart.cartItems.length;

  const onOpenChangeHandler = () => {
    if (pathName === "/cart") return;
    cartCount > 2 ? route.push("/cart") : setOpen(!open);
  };

  return (
    <Popover
      open={open}
      destroyOnHidden
      onOpenChange={onOpenChangeHandler}
      content={<CartBody setOpen={setOpen} />}
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
