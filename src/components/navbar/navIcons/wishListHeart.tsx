import { Badge } from "antd";
import { Link } from "@/i18n/navigation";
import { CiHeart } from "react-icons/ci";
import React from "react";
import useUserStore from "@/store/useUserStore";

const WishListHeart = () => {
  const user = useUserStore((state) => state.user);
  if (!user) return null;

  return (
    <Link href={"/wishlist"} className="flex items-center justify-center">
      <Badge
        count={user?.wishlist.length}
        size="small"
        className=" cursor-pointer  "
        color="text-primary"
      >
        <CiHeart size={25} className="hover:!text-primary hover:scale-105" />
      </Badge>
    </Link>
  );
};

export default WishListHeart;
