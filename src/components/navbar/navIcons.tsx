"use client";
import useAuthStore from "@/store/useAuthStore";
import { Avatar, Badge, Button, Popover } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useLogout } from "@/hooks/global/useLogout";
import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import CartModal from "./cartModel";
const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { isLogin, isAdmin } = useAuthStore();
  const user = useUserStore((state) => state.user);
  const { logout, isPending } = useLogout();

  const handleProfileIcon = () => {
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/login");
  };

  const handleProfilePage = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-2 md:gap-4 xl:gap-6">
      <Popover
        open={isProfileOpen}
        onOpenChange={handleProfileIcon}
        content={
          <div className="flex flex-col gap-2">
            <Link href="/profile">
              <Button
                className="mt-2 cursor-pointer"
                onClick={handleProfilePage}
                type="primary"
              >
                Profile
              </Button>
            </Link>
            <Button
              loading={isPending}
              className="mt-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        }
        trigger="click"
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar src={user?.profileImg || "/profile.png"} size={30} alt="" />
          <span className=" hidden md:block truncate">
            {user?.name || "Login"}
          </span>
        </div>
      </Popover>

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

export default NavIcons;
