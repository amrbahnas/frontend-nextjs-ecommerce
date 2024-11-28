import CheckoutType from "@/components/cart/checkoutType";
import ResetCart from "@/components/cart/resetCart";
import useCartActions from "@/hooks/global/useCartActions";
import useAuthStore from "@/store/useAuthStore";
import { Button, Empty, Spin } from "antd";
import Link from "next/link";
import { useState } from "react";
import ApplyCoupon from "../../cart/applyCoupon";
import CartItem from "../../cart/cartItem";
import Pricing from "../../cart/pricing";

const CartBody = ({
  cart,
  refetch,
  setOpen,
}: {
  cart: CartType;
  refetch: any;
  setOpen: (value: boolean) => void;
}) => {
  const [deleting, setDeleting] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const {
    cartItems = [],
    totalCartPrice,
    _id: cartId,
    totalPriceAfterDiscount,
    appliedCoupon,
  } = cart;

  const {
    isLoading,
    handleResetCart,
    checkoutType,
    setCheckoutType,
    handleCheckout,
  } = useCartActions({
    cartId,
    refetch,
    onSuccess: setOpen,
  });

  return (
    <Spin spinning={isLoading || deleting}>
      <div className="  flex flex-col gap-6 z-20  w-72">
        {!cartItems[0] ? (
          <Empty />
        ) : (
          <>
            <div className="flex  justify-between items-center mt-2">
              <h2 className="text-xl">Shopping Cart</h2>
              <ResetCart handleResetCart={handleResetCart} />
            </div>

            <div className="flex flex-col gap-8">
              {cartItems?.map((item: CartItemType) => (
                <CartItem
                  item={item}
                  key={item._id}
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
                Shipping and taxes calculated at checkout.
              </p>
              <CheckoutType
                checkoutType={checkoutType}
                setCheckoutType={setCheckoutType}
              />
              <div className="flex  items-center gap-1 text-sm">
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={handleCheckout}
                  className=" !py-5  !bg-black/90 hover:scale-105 !border-none !text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                >
                  Checkout
                </Button>
                <Link href="/cart">
                  <Button onClick={() => setOpen(false)} className="!py-5">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
};

export default CartBody;
