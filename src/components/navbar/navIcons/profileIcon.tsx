"use client";

import useUserStore from "@/store/useUserStore";
import { Avatar, Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export const ProfileIcon = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();
  const { logout, isPending } = useLogout();

  const handleProfileIcon = () => {
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/auth/login");
  };

  const handleLogout = () => {
    logout("/");
    setIsProfileOpen(false);
  };

  return (
    <Popover
      open={isProfileOpen}
      onOpenChange={handleProfileIcon}
      content={
        <ul className="w-36 py-1.5 rounded-lg   bg-white">
          <li>
            <Link href="/profile" onClick={() => setIsProfileOpen(false)}>
              <div className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 transition-colors duration-200">
                <FiUser className="text-gray-400 text-lg" />
                <span className="text-gray-700 font-medium">Profile</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <div className="flex items-center gap-3 px-2 py-2.5 hover:bg-gray-50 transition-colors duration-200">
                <FiSettings className="text-gray-400 text-lg" />
                <span className="text-gray-700 font-medium">Settings</span>
              </div>
            </Link>
          </li>
          <li className="border-t border-gray-100 mt-1">
            <div
              className="flex items-center gap-3 px-2 py-2.5 hover:bg-red-50 transition-colors duration-200 text-red-600 cursor-pointer mt-1"
              onClick={handleLogout}
            >
              <FiLogOut className="text-lg" />
              <span className="font-medium">
                {isPending ? "Logging out..." : "Logout"}
              </span>
            </div>
          </li>
        </ul>
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
  );
};

export default memo(ProfileIcon);
