import Link from "next/link";

import { useToggleProductWishlist } from "@/_api/actions";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Spin } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import HeartAnimation from "../ui/heartAnimation";
import resSanatize from "@/services/sanatizeApiRes";

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
    if (isPending) return;
    setIsWithListed((prev) => !prev);
    setShowHeartAnimation(true);
    setTimeout(() => {
      setShowHeartAnimation(false);
    }, 4000);

    toggleWishlist(
      {},
      {
        onSuccess: (res) => {
          const newUser = resSanatize(res);
          setUser(newUser);
          if (!isWithListed) {
            successToast();
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
  // if (isPending) return <Spin />;
  return (
    <div
      onClick={handleToggleWishlist}
      className={
        "cursor-pointer relative border border-gray-300 rounded-lg p-1 md:p-2 hover:border-primary  hover:text-primary " +
        className
      }
    >
      {isWithListed ? <FaHeart size={25} color="red" /> : <CiHeart size={25} />}

      <HeartAnimation play={showHeartAnimation} />
    </div>
  );
};

const successToast = () => {
  toast.success(
    <div className={"flex items-center gap-1 flex-wrap"}>
      Product added to wishlist
      <Link
        href="/wishlist"
        className="!text-blue-500 !underline !ml-2 !font-semibold"
      >
        View wishlist
      </Link>
    </div>,
    {
      position: "bottom-center",
      className: "mb-10",
      duration: 3000,
    }
  );
};

export default WishlistButton;
