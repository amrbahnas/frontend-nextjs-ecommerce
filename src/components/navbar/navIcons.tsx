"use client";
import useAuthStore from "@/store/useAuthStore";
import { Button, Popover } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import CartModal from "./cartModal";
import { useLogout } from "@/hooks/useLogout";
const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { isLogin } = useAuthStore();
  const { logout, isPending } = useLogout();

  const handleProfileIcon = () => {
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/auth/login");
  };

  const handleProfilePage = () => {
    router.push("/profile");
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
            <Button
              className="mt-2 cursor-pointer"
              onClick={handleProfilePage}
              type="primary"
            >
              Profile
            </Button>
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
        <Image
          src={"/profile.png"}
          width={22}
          height={22}
          alt=""
          className="cursor-pointer"
        />
      </Popover>
      <Image
        src="/notification.png"
        width={22}
        height={22}
        alt="heart"
        className=" cursor-pointer"
      />
      <CartModal />
    </div>
  );
};

export default NavIcons;
