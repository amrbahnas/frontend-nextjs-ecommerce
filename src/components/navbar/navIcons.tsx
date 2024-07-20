"use client";
import { Badge, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import CartModal from "./cartModal";
import Cookies from "js-cookie";
import logOut from "../../services/logOut";
const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleProfile = () => {
    const isLogin = Cookies.get("isLogin") === "true";
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/auth/login");
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6">
      <Popover
        open={isProfileOpen}
        onOpenChange={handleProfile}
        content={
          <div className="flex flex-col gap-2">
            <Link href="/profile">Profile</Link>
            <div className="mt-2 cursor-pointer" onClick={logOut}>
              Logout
            </div>
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
