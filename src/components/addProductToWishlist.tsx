import Link from "next/link";

import { useToggleProductWishlist } from "@/api/actions";
import useUserStore from "@/store/useUserStore";
import { Divider } from "antd";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import useAuthStore from "@/store/useAuthStore";

const WishlistButton = ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const wishlist = user?.wishlist || [];
  const setUser = useUserStore((state) => state.setUser);

  const [isWithlisted, setIsWithlisted] = useState(
    wishlist.includes(productId)
  );

  const { toggleWishlist, isPending } = useToggleProductWishlist(productId);
  const handleToggleWishlist = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsWithlisted((prev) => !prev);
    toggleWishlist(
      {},
      {
        onSuccess: (res) => {
          setUser({
            ...user,
            wishlist: res.data.wishlist,
          });
        },
        onError: () => {
          setIsWithlisted((prev) => !prev);
        },
      }
    );
  };

  if (!isLogin) return null;
  return (
    <div
      onClick={handleToggleWishlist}
      className={"cursor-pointer " + className}
    >
      {isWithlisted ? (
        <FaHeart size={25} color="red" />
      ) : (
        <CiHeart size={25} color="black" />
      )}
    </div>
  );
};

export default WishlistButton;
