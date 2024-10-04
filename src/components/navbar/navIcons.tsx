"use client";
import useAuthStore from "@/store/useAuthStore";
import { Badge, Button, Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import CartModal from "./cartModel";
import useUserStore from "@/store/useUserStore";
import { MdDashboard } from "react-icons/md";
import NextImage from "../nextImage";
import { CiHeart } from "react-icons/ci";
const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { isLogin } = useAuthStore();
  const user = useUserStore((state) => state.user);
  const { logout, isPending } = useLogout();

  const handleProfileIcon = () => {
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/auth/login");
  };

  const handleProfilePage = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6">
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
          <NextImage
            src={"/profile.png"}
            width={22}
            height={22}
            alt=""
            className="cursor-pointer"
          />
          <span>{user?.name}</span>
        </div>
      </Popover>

      {user?.role === "admin" && (
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
            className=" cursor-pointer"
            color="blue"
          >
            <CiHeart size={25} />
          </Badge>
        </Link>
      )}
      {/* <NextImage
        src="/notification.png"
        width={22}
        height={22}
        alt="heart"
        className=" cursor-pointer"
      /> */}
      <CartModal />
    </div>
  );
};

export default NavIcons;
