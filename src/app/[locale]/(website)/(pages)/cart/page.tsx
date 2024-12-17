"use client";
import { useGetCart } from "@/_api/query";
import ApplyCoupon from "@/components/cart/applyCoupon";
import CartItem from "@/components/cart/cartItem";
import CheckoutType from "@/components/cart/checkoutType";
import Pricing from "@/components/cart/pricing";
import ResetCart from "@/components/cart/resetCart";
import Container from "@/components/container";
import useCartActions from "@/hooks/global/useCartActions";
import useAuthStore from "@/store/useAuthStore";
import { Button, Divider, Empty, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import CartPageSkeleton from "./_comps/cartPage.skeleton";
import Link from "next/link";
import { GrShop } from "react-icons/gr";
import useCardStore from "@/store/useCardStore";
import NoData from "@/components/ui/noData";
import CheckButton from "@/components/cart/checkButton";

const Page = () => {
  const [deleting, setDeleting] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { storeCart, setOnlineCart } = useCardStore();
  const { cart: apiCart, isLoading: fetchLoading, refetch } = useGetCart();

  const renderedCart = isLogin ? apiCart : storeCart;
  const cartCount = renderedCart.cartItems.length;

  const {
    cartItems = [],
    totalCartPrice,
    _id: cartId,
    totalPriceAfterDiscount,
    appliedCoupon,
  } = renderedCart;
  const {
    isLoading,
    handleResetCart,
    checkoutType,
    setCheckoutType,
    handleCheckout,
  } = useCartActions({
    cartId,
    refetch,
  });

  useEffect(() => {
    if (apiCart.id && isLogin) {
      setOnlineCart({
        cartItems: apiCart.cartItems,
        totalCartPrice: apiCart.totalCartPrice,
      });
    }
  }, [apiCart]);

  if (fetchLoading) return <CartPageSkeleton />;

  return (
    <Container>
      <Spin spinning={isLoading || deleting || fetchLoading}>
        <div className="flex flex-col md:flex-row mt-6 gap-4 md:gap-32 items-start">
          <div className="flex flex-col gap-8 max-h-96 overflow-scroll w-full md:flex-1">
            {cartItems?.length === 0 && (
              <div className="flex items-center flex-col gap-8">
                <NoData />
                <Link
                  className="flex items-center gap-2 !text-black hover:!text-primary"
                  href="/"
                >
                  <GrShop />
                  <span>Continue Shopping</span>
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
            <p className="text-gray-500 text-sm">
              Shipping and taxes calculated at checkout.
            </p>
            <Divider className="!my-3" />

            <CheckoutType
              checkoutType={checkoutType}
              setCheckoutType={setCheckoutType}
            />
            <div className="flex flex-col items-end text-sm">
              <CheckButton
                isLoading={isLoading}
                handleCheckout={handleCheckout}
                invalidCart={renderedCart.invalidCart}
              />
            </div>
          </div>
        </div>
      </Spin>
    </Container>
  );
};

export default Page;
