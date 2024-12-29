"use client";

import useUserStore from "@/store/useUserStore";
import { Avatar, Button, Popover } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
  FiHeart,
} from "react-icons/fi";

export const ProfileIcon = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isPending } = useLogout();

  const handleProfileIcon = () => {
    isLogin ? setIsProfileOpen(!isProfileOpen) : router.push("/auth/login");
  };

  const handleLogout = () => {
    logout("/");
    setIsProfileOpen(false);
  };
  //close when navigate
  React.useEffect(() => {
    setIsProfileOpen(false);
  }, [pathname]);

  return (
    <Popover
      open={isProfileOpen}
      onOpenChange={handleProfileIcon}
      content={
        <div className="pt-3">
          {/* Header with user info */}
          <div className=" pb-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.profileImg || "/profile.png"}
                size={40}
                className="border-2 border-primary/20"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {user?.name || "Guest User"}
                </h4>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || "Please login to continue"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="pt-2 ">
            <Link href="/profile" onClick={() => setIsProfileOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FiUser className="text-primary text-lg" />
                <span className="text-gray-700">Profile</span>
              </div>
            </Link>

            <Link href="/orders">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FiShoppingBag className="text-primary text-lg" />
                <span className="text-gray-700">Orders</span>
              </div>
            </Link>

            <Link href="/wishlist">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FiHeart className="text-primary text-lg" />
                <span className="text-gray-700">Wishlist</span>
              </div>
            </Link>

            <Link href="/settings">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FiSettings className="text-primary text-lg" />
                <span className="text-gray-700">Settings</span>
              </div>
            </Link>

            {/* Logout button */}
            <div className="px-2 mt-2 pt-2 border-t border-gray-100">
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <FiLogOut className="text-lg" />
                <span>{isPending ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </div>
        </div>
      }
      trigger="click"
      placement="bottomRight"
      overlayClassName="!p-0 !m-0 !w-64"
    >
      <div className="flex items-center gap-3 cursor-pointer group">
        <Avatar
          src={user?.profileImg || "/profile.png"}
          size={32}
          className="border-2 border-transparent group-hover:border-primary/20 transition-colors"
          alt={user?.name || "User avatar"}
        />
        {isLogin ? (
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[150px]">
              {user?.email}
            </p>
          </div>
        ) : (
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700  ">Guest User</p>
            <p className="text-xs text-gray-500 truncate max-w-[100px] group-hover:text-primary transition-colors ">
              Please login
            </p>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default memo(ProfileIcon);
