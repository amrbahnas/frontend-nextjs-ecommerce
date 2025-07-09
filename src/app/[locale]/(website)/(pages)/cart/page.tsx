"use client";
import { useGetCart } from "@/_api/query";
import ApplyCoupon from "@/components/cart/applyCoupon";
import CartItem from "@/components/cart/cartItem";
import CheckButton from "@/components/cart/checkButton";
import Pricing from "@/components/cart/pricing";
import ResetCart from "@/components/cart/resetCart";
import Container from "@/components/ui/container";
import NoData from "@/components/ui/noData";
import useCartActions from "@/hooks/global/useCartActions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Divider, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrShop } from "react-icons/gr";
import CartPageSkeleton from "./_comps/cartPage.skeleton";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Cart");
  const [deleting, setDeleting] = useState(false);
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, setOnlineCart } = useCardStore();
  const { cart: apiCart, isLoading: fetchLoading, refetch } = useGetCart({});

  const renderedCart = isLogin ? apiCart : storeCart;
  const cartCount = renderedCart?.cartItems?.length || 0;

  const {
    cartItems = [],
    totalCartPrice,
    id: cartId,
    totalPriceAfterDiscount,
    appliedCoupon,
  } = renderedCart;
  const { isLoading, handleResetCart } = useCartActions({
    cartId,
    refetch,
  });

  useEffect(() => {
    if (apiCart.id && isLogin) {
      setOnlineCart({
        id: apiCart.id,
        cartItems: apiCart.cartItems,
        totalCartPrice: apiCart.totalCartPrice,
      });
    }
  }, [apiCart]);

  const handleCheckout = () => {
    if (isLogin) {
      route.push("/checkout");
    } else {
      route.push("/auth/login");
    }
  };

  if (fetchLoading) return <CartPageSkeleton />;

  return (
    <Container>
      <Spin spinning={isLoading || deleting || fetchLoading}>
        <div className="flex flex-col md:flex-row mt-6 gap-4 md:gap-32 items-start">
          <div className="flex flex-col gap-8 max-h-96 overflow-auto w-full md:flex-1">
            {cartItems?.length === 0 && (
              <div className="flex items-center flex-col gap-8">
                <NoData />
                <Link
                  className="flex items-center gap-2 !text-black hover:!text-primary"
                  href="/"
                >
                  <GrShop />
                  <span>{t("actions.continueShopping")}</span>
                </Link>
              </div>
            )}
            {cartItems?.map((item: CartItemType) => (
              <div key={item.id} className="border-b border-gray-200 pb-1">
                <CartItem
                  item={item}
                  refetch={refetch}
                  setDeleting={setDeleting}
                />
              </div>
            ))}
          </div>
          <div className="w-full md:w-72 flex flex-col gap-4">
            <div className="flex justify-end">
              <ResetCart handleResetCart={handleResetCart} />
            </div>
            {cartCount > 0 && (
              <ApplyCoupon
                refetchCart={refetch}
                hidden={!isLogin}
                appliedCoupon={appliedCoupon}
              />
            )}
            <Divider className="!my-3" />
            <Pricing
              totalCartPrice={totalCartPrice}
              totalPriceAfterDiscount={totalPriceAfterDiscount}
            />
            <p className="text-gray-500 text-sm">{t("shippingNote")}</p>
            <Divider className="!my-3" />

            <div className="flex flex-col items-end text-sm">
              <CheckButton
                isLoading={isLoading}
                handleCheckout={handleCheckout}
                invalidCart={renderedCart.invalidCart}
                size="large"
              />
            </div>
          </div>
        </div>
      </Spin>
    </Container>
  );
};

export default Page;
