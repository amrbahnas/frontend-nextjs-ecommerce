"use client";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { Badge } from "antd";
import Link from "next/link";
import { memo } from "react";
import { CiHeart } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import CartModal from "../cartModel";
import ProfileIcon from "./profileIcon";
import ChangeLanguage from "./changeLanguage";

const NavIcons = () => {
  const { isLogin, isAdmin } = useAuthStore();
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
      <ChangeLanguage />
      <ProfileIcon />
      {isAdmin && (
        <Link href={"/admin"} className="flex items-center gap-1 ">
          <MdDashboard />
          admin
        </Link>
      )}
      {isLogin && (
        <Link href={"/wishlist"} className="flex items-center justify-center">
          <Badge
            count={user?.wishlist.length}
            size="small"
            className=" cursor-pointer "
            color=" text-primary"
          >
            <CiHeart size={25} />
          </Badge>
        </Link>
      )}
      <CartModal />
    </div>
  );
};

export default memo(NavIcons);
