import Link from "next/link";

import { useToggleProductWishlist } from "@/_api/actions";
import useUserStore from "@/store/useUserStore";
import { Divider, Spin } from "antd";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import useAuthStore from "@/store/useAuthStore";
import HeartAnimation from "./ui/heartAnimation";
import toast from "react-hot-toast";

const WishlistButton = ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const wishlist = user?.wishlist || [];
  const setUser = useUserStore((state) => state.setUser);

  const [isWithListed, setIsWithListed] = useState(
    wishlist.includes(productId)
  );

  const { toggleWishlist, isPending } = useToggleProductWishlist(productId);
  const handleToggleWishlist = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsWithListed((prev) => !prev);
    toggleWishlist(
      {},
      {
        onSuccess: (res) => {
          setUser({
            ...user,
            wishlist: res.data.wishlist,
          });
          if (!isWithListed) {
            toast.success("Product Added to wishlist");
            setShowHeartAnimation(true);
            setTimeout(() => {
              setShowHeartAnimation(false);
            }, 4000);
          } else {
            toast.success("Product Removed from wishlist");
          }
        },
        onError: () => {
          setIsWithListed((prev) => !prev);
        },
      }
    );
  };

  if (!isLogin) return null;
  if (isPending) return <Spin />;
  return (
    <div
      onClick={handleToggleWishlist}
      className={
        "cursor-pointer relative  border border-gray-300 rounded-lg p-2 hover:border-primary  hover:text-primary " +
        className
      }
    >
      {isWithListed ? <FaHeart size={25} color="red" /> : <CiHeart size={25} />}

      <HeartAnimation play={showHeartAnimation} />
    </div>
  );
};

export default WishlistButton;
