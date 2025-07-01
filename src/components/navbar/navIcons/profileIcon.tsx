"use client";

import useUserStore from "@/store/useUserStore";
import { Avatar, Popover } from "antd";
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
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { SmartLink } from "@/components/ui/smartLink";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    icon: <FiUser className="text-primary text-lg" />,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: <FiShoppingBag className="text-primary text-lg" />,
    label: "Orders",
    href: "/orders",
  },
  {
    icon: <FiHeart className="text-primary text-lg" />,
    label: "Wishlist",
    href: "/wishlist",
  },
  {
    icon: <FiSettings className="text-primary text-lg" />,
    label: "Settings",
    href: "/settings",
  },
];

const useProfilePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isPending } = useLogout();

  const handleToggle = () => {
    isLogin ? setIsOpen(!isOpen) : router.push("/auth/login");
  };

  const handleLogout = () => {
    logout("/");
    setIsOpen(false);
  };

  // Close when navigating
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return {
    isOpen,
    isPending,
    handleToggle,
    handleLogout,
  };
};

const UserAvatar: React.FC<{
  src?: string;
  name?: string;
  size?: number;
  className?: string;
}> = ({ src, name, size = 32, className = "" }) => (
  <Avatar
    src={src || "/profile.png"}
    size={size}
    className={className}
    alt={name || "User avatar"}
  />
);

const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => (
  <SmartLink prefetchOnVisible href={item.href}>
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      {item.icon}
      <span className="text-gray-700">{item.label}</span>
    </div>
  </SmartLink>
);

const PopoverContent: React.FC<{
  user: { name?: string; email?: string; profileImg?: string } | null;
  onLogout: () => void;
  isPending: boolean;
}> = ({ user, onLogout, isPending }) => (
  <div className="pt-3">
    <div className="pb-3 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <UserAvatar
          src={user?.profileImg}
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

    <div className="pt-2">
      {menuItems.map((item) => (
        <MenuItem key={item.href} item={item} />
      ))}

      <div className="px-2 mt-2 pt-2 border-t border-gray-100">
        <button
          onClick={onLogout}
          disabled={isPending}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <FiLogOut className="text-lg" />
          <span>{isPending ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  </div>
);

export const ProfileIcon = () => {
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const xs = useBreakPoints("xs");
  const { isOpen, isPending, handleToggle, handleLogout } = useProfilePopover();

  return (
    <Popover
      open={isOpen}
      onOpenChange={handleToggle}
      content={
        <PopoverContent
          user={user}
          onLogout={handleLogout}
          isPending={isPending}
        />
      }
      trigger="click"
      placement={xs ? "bottom" : "bottomRight"}
      classNames={{
        root: "!p-0 !m-0 !w-64",
      }}
    >
      <div className="flex items-center gap-3 cursor-pointer group">
        <UserAvatar
          src={user?.profileImg}
          name={user?.name}
          className="border-2 border-transparent group-hover:border-primary/20 transition-colors"
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
            <p className="text-sm font-medium text-gray-700">Guest User</p>
            <p className="text-xs text-gray-500 truncate max-w-[100px] group-hover:text-primary transition-colors">
              Please login
            </p>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default memo(ProfileIcon);
