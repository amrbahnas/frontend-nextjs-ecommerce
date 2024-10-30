import { useRemoveItemFromCart } from "@/api/actions";
import NextImage from "@/components/ui/nextImage";
import useAuthStore from "@/store/useAuthStore";
import useCardStore from "@/store/useCardStore";

const CartItem = ({
  item,
  refetch,
  setDeleting,
}: {
  item: CartItemType;
  refetch: any;
  setDeleting: (value: boolean) => void;
}) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { deleteCartItem, decreaseCartItemsCount } = useCardStore();
  const { removeItem, isPending } = useRemoveItemFromCart(item._id);
  return (
    <div className="flex gap-4" key={item._id}>
      {item?.product?.imageCover && (
        <NextImage
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
              if (isLogin) {
                removeItem(
                  {},
                  {
                    onSuccess: () => {
                      setDeleting(false);
                      decreaseCartItemsCount();
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

export default CartItem;
