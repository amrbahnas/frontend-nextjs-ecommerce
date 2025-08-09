"use client";
import { useRemoveItemFromCart } from "@/_api/actions";
import NextImage from "@/components/ui/nextImage";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useTranslations } from "next-intl";

const CartItem = ({
  item,
  refetch,
  setDeleting,
}: {
  item: CartItemType;
  refetch: any;
  setDeleting: (value: boolean) => void;
}) => {
  const t = useTranslations("Cart.item");
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { deleteCartItem } = useCardStore();
  const { removeItem, isPending } = useRemoveItemFromCart(item.id);
  const productQuantity = item?.availableQuantity || 0;
  const isOutOfStock = item.quantity > productQuantity;

  return (
    <div className="flex gap-2" key={item.id}>
      {item?.imageCover && (
        <NextImage
          src={item.imageCover}
          alt=""
          width={72}
          height={96}
          className="object-cover rounded-md cursor-pointer"
          onClick={() => route.push(`/product/${item.productId}`)}
        />
      )}
      <div className="flex flex-col justify-between w-full">
        <div className="">
          <div className="flex items-center justify-between gap-8">
            <Link href={`/product/${item.productId}`}>
              <h3 className="font-semibold">{item.title}</h3>
            </Link>
            {!isOutOfStock && (
              <div className="p-1 bg-gray-50 dark:bg-dark-bg-secondary rounded-sm flex items-center gap-2">
                {item.quantity && item.quantity > 1 && (
                  <div className="text-xs text-green-500 truncate flex">
                    {item.quantity}
                  </div>
                )}
                {t("price", { price: item.price })}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">
                {t("quantity")}:{item.quantity}
              </span>
              {isOutOfStock && (
                <span className="text-red-500 font-bold">
                  {t("outOfStock")}
                </span>
              )}
            </div>
            <div className="text-gray-500 flex items-center gap-1 capitalize">
              <span>{t("color")}:</span>
              {item.color}
            </div>
            {item.size && (
              <span className="text-gray-500">
                {t("size")}: {item.size}
              </span>
            )}
          </div>
          <span
            className="text-blue-500"
            style={{ cursor: isPending ? "not-allowed" : "pointer" }}
            onClick={async () => {
              setDeleting(true);
              if (isLogin) {
                removeItem(
                  {},
                  {
                    onSuccess: () => {
                      setDeleting(false);
                      refetch();
                    },
                  }
                );
              } else {
                deleteCartItem(item);
                setDeleting(false);
              }
            }}
          >
            {t("remove")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItem);
