import { useGetCart } from "@/_api/query";
import ResetCart from "@/components/cart/resetCart";
import useCartActions from "@/hooks/global/useCartActions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Empty, Spin } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import ApplyCoupon from "../../cart/applyCoupon";
import CartItem from "../../cart/cartItem";
import Pricing from "../../cart/pricing";
import CartSkeleton from "./cart.skeleton";
import CartActionsBTN from "./cartActionsBTN";

const CartBody = ({ setOpen }: { setOpen: (value: boolean) => void }) => {
  const route = useRouter();
  const t = useTranslations("Cart");
  const [deleting, setDeleting] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, setOnlineCart } = useCardStore();
  const {
    cart: apiCart,
    isLoading: isLoadingApiCart,
    refetch,
  } = useGetCart({
    skip: !isLogin,
  });

  const {
    cartItems = [],
    totalCartPrice,
    id: cartId,
    totalPriceAfterDiscount,
    appliedCoupon,
    invalidCart,
  } = (isLogin ? apiCart : storeCart) as CartType;

  useEffect(() => {
    if (apiCart.id && isLogin) {
      setOnlineCart({
        id: apiCart.id,
        cartItems: apiCart.cartItems,
        totalCartPrice: apiCart.totalCartPrice,
      });
    }
  }, [apiCart]);

  const { isLoading, handleResetCart } = useCartActions({
    cartId,
    refetch,
    onSuccess: setOpen,
  });

  const handleCheckout = () => {
    if (!isLogin) {
      route.push("/auth/login");
      return;
    }
    route.push("/checkout");
    setOpen(false);
  };

  if (isLoadingApiCart) return <CartSkeleton />;

  return (
    <Spin spinning={isLoading || deleting}>
      <div className="flex flex-col gap-6 z-20 min-w-72">
        {!cartItems[0] ? (
          <Empty description={t("empty")} />
        ) : (
          <>
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-xl">{t("title")}</h2>
              <ResetCart handleResetCart={handleResetCart} />
            </div>

            <div className="flex flex-col gap-8">
              {cartItems?.map((item: CartItemType) => (
                <CartItem
                  item={item}
                  key={item.id}
                  refetch={refetch}
                  setDeleting={setDeleting}
                />
              ))}
            </div>

            <ApplyCoupon
              refetchCart={refetch}
              hidden={!isLogin}
              appliedCoupon={appliedCoupon}
            />

            <div className="">
              <Pricing
                totalCartPrice={totalCartPrice}
                totalPriceAfterDiscount={totalPriceAfterDiscount}
              />
              <p className="text-gray-500 text-sm mt-2 mb-4">
                {t("shippingNote")}
              </p>
              <CartActionsBTN
                invalidCart={invalidCart}
                isLoading={isLoading}
                handleCheckout={handleCheckout}
                setOpen={setOpen}
              />
            </div>
          </>
        )}
      </div>
    </Spin>
  );
};

export default memo(CartBody);
