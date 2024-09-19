import { useCardCheckout, useCashCheckout, useResetCart } from "@/api/actions";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import { Button, Radio, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import CartItem from "./cartItem";

const { Group } = Radio;

const CartBody = ({
  isLoading,
  cart,
  refetch,
  setOpen,
}: {
  isLoading: boolean;
  cart: CartType;
  refetch: any;
  setOpen: (value: boolean) => void;
}) => {
  const router = useRouter();
  const { cartItems, totalCartPrice, _id: cartId } = cart;
  const [deleting, setDeleting] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const {
    cartLoading,
    resetCart: resetStoreCart,
    setCartItemsCount,
    cartItemsCount,
  } = useCardStore();

  const { resetApiCart, resetApiCartLoading } = useResetCart();
  const [checkoutType, setCheckoutType] = useState<"card" | "cash">("card");
  const { cardCheckout, checkoutLoading } = useCardCheckout(cartId);
  const { cashCheckout, cashCheckoutLoading } = useCashCheckout(cartId);

  const handleResetCart = async () => {
    if (isLogin) {
      resetApiCart(
        {},
        {
          onSuccess: () => {
            refetch();
            toast.success("Cart reset successfully");
            setOpen(false);
            setCartItemsCount(0);
          },
        }
      );
    } else {
      resetStoreCart();
      setCartItemsCount(0);
    }
  };

  const handleCheckout = () => {
    if (!isLogin) {
      router.push("/auth/login");
      setOpen(false);
      return;
    }
    if (checkoutType === "card") {
      cardCheckout(
        {},
        {
          onSuccess: (res) => {
            window.location.href = res.data.checkoutPage;
          },
        }
      );
    } else {
      cashCheckout(
        {},
        {
          onSuccess: () => {
            toast.success("Order placed successfully");
            router.push("/profile");
            setOpen(false);
            setCartItemsCount(0);
          },
        }
      );
    }
  };

  return (
    <Spin
      spinning={isLoading || deleting || cartLoading || resetApiCartLoading}
    >
      <div className="  flex flex-col gap-6 z-20">
        {!cartItems[0] ? (
          <div className="">Cart is Empty</div>
        ) : (
          <>
            {/* reset */}
            <div className="flex  justify-between items-center mt-2">
              <h2 className="text-xl">Shopping Cart</h2>
              <Button
                onClick={handleResetCart}
                className="text-xs  text-gray-500 !p-0 underline"
                type="link"
              >
                Reset Cart
              </Button>
            </div>
            {/* LIST */}
            <div className="flex flex-col gap-8">
              {/* ITEM */}
              {cartItems?.map((item: CartItemType) => (
                <CartItem
                  item={item}
                  key={item._id}
                  refetch={refetch}
                  setDeleting={setDeleting}
                />
              ))}
            </div>
            {/* BOTTOM */}
            <div className="">
              <div className="flex items-center justify-between font-semibold">
                <span className="">Subtotal</span>
                <span className="">${totalCartPrice}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mb-4  space-y-2">
                <div>
                  <strong>Checkout Type</strong>
                </div>
                <Group
                  value={checkoutType}
                  onChange={(e) => setCheckoutType(e.target.value)}
                >
                  <Radio value="card">credit card</Radio>
                  <Radio value="cash">Cash</Radio>
                </Group>
              </div>
              <div className="flex justify-between text-sm">
                {/* <Button className="!py-5">View Cart</Button> */}
                <Button
                  loading={checkoutLoading || cashCheckoutLoading}
                  disabled={checkoutLoading || cashCheckoutLoading}
                  onClick={handleCheckout}
                  className=" !py-5  !bg-black/90 !text-white disabled:cursor-not-allowed disabled:opacity-75 w-full"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
};

export default CartBody;
