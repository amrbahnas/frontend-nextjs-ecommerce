"use client";
import { Badge, Button, Popover, Spin } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const { data: cart, isLoading, refetch } = useQuery("/cart");

  useEffect(() => {
    if (open) refetch();
  }, [open]);

  return (
    <Popover
      open={open}
      onOpenChange={() => setOpen(!open)}
      content={<CartBody isLoading={isLoading} cart={cart} refetch={refetch} />}
      trigger="click"
    >
      <Badge
        count={cart?.cartItems?.length > 0 ? cart.cartItems.length : 0}
        size="small"
      >
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

const CartBody = ({
  isLoading,
  cart,
  refetch,
}: {
  isLoading: boolean;
  cart: CartType;
  refetch: any;
}) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <Spin spinning={isLoading || deleting}>
      <div className="  flex flex-col gap-6 z-20">
        {!cart?.cartItems[0] ? (
          <div className="">Cart is Empty</div>
        ) : (
          <>
            <h2 className="text-xl">Shopping Cart</h2>
            {/* LIST */}
            <div className="flex flex-col gap-8">
              {/* ITEM */}
              {cart?.cartItems?.map((item: CartItemType) => (
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
                <span className="">${cart?.totalCartPrice}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <Button className="!py-5">View Cart</Button>
                <Button className=" !py-5  !bg-black !text-white disabled:cursor-not-allowed disabled:opacity-75">
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

const CartItem = ({
  item,
  refetch,
  setDeleting,
}: {
  item: CartItemType;
  refetch: any;
  setDeleting: (value: boolean) => void;
}) => {
  const { mutate: removeItem, isPending } = useMutation(
    `/cart/${item._id}`,
    "delete"
  );

  return (
    <div className="flex gap-4" key={item._id}>
      {item?.product?.imageCover && (
        <Image
          src={item.product?.imageCover}
          alt=""
          width={72}
          height={96}
          className="object-cover rounded-md"
        />
      )}
      <div className="flex flex-col justify-between w-full">
        {/* TOP */}
        <div className="">
          {/* TITLE */}
          <div className="flex items-center justify-between gap-8">
            <h3 className="font-semibold">{item.product?.title}</h3>
            <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
              {item.quantity && item.quantity > 1 && (
                <div className="text-xs text-green-500">{item.quantity} x </div>
              )}
              ${item.price}
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Qty. {item.quantity}</span>
          <span
            className="text-blue-500"
            style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            onClick={async () => {
              setDeleting(true);
              removeItem(
                {},
                {
                  onSuccess: () => {
                    setDeleting(false);
                    refetch();
                  },
                }
              );
            }}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
