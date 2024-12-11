import { useRemoveItemFromCart } from "@/_api/actions";
import NextImage from "@/components/ui/nextImage";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
// const ItemQuantity = ({ item }: { item: CartItemType }) => {
//   const productQuantity = item?.product?.quantity || 0;
//   return (
//     <div className="">
//       { ? (
//         <span className="text-red-500">Out of Stock</span>
//       ) : (
//         item.quantity + "x"
//       )}
//     </div>
//   );
// };
const CartItem = ({
  item,
  refetch,
  setDeleting,
}: {
  item: CartItemType;
  refetch: any;
  setDeleting: (value: boolean) => void;
}) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { deleteCartItem } = useCardStore();
  const { removeItem, isPending } = useRemoveItemFromCart(item._id);
  const productQuantity = item?.product?.quantity || 0;
  const isOutOfStock = item.quantity > productQuantity;

  return (
    <div className="flex gap-2" key={item._id}>
      {item?.product?.imageCover && (
        <NextImage
          src={item.product?.imageCover}
          alt=""
          width={72}
          height={96}
          className="object-cover rounded-md cursor-pointer"
          style={{ width: "auto", height: "auto" }}
          onClick={() => route.push(`/product/${item.product?._id}`)}
        />
      )}
      <div className="flex flex-col justify-between w-full">
        {/* TOP */}
        <div className="">
          {/* TITLE */}
          <div className="flex items-center justify-between gap-8">
            <Link href={`/product/${item.product?._id}`}>
              <h3 className="font-semibold">{item.product?.title}</h3>
            </Link>
            {!isOutOfStock && (
              <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                {item.quantity && item.quantity > 1 && (
                  <div className="text-xs text-green-500 truncate flex">
                    {item.quantity}
                  </div>
                )}
                ${item.price}
              </div>
            )}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between text-sm">
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Qty:{item.quantity}</span>
              {isOutOfStock && (
                <span className="text-red-500 font-bold">
                  No longer available
                </span>
              )}
            </div>
            <div className="text-gray-500 flex items-center gap-1 capitalize">
              <span>Color:</span>
              {item.color}
              {/* <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              /> */}
            </div>
            {item.size && (
              <span className="text-gray-500">Size: {item.size}</span>
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
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(CartItem);
