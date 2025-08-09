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
import { useTranslations } from "next-intl";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const useMenuItems = () => {
  const t = useTranslations("Profile.menu");

  return [
    {
      icon: <FiUser className="text-primary text-lg" />,
      label: t("profile"),
      href: "/profile",
    },
    {
      icon: <FiShoppingBag className="text-primary text-lg" />,
      label: t("orders"),
      href: "/orders",
    },
    {
      icon: <FiHeart className="text-primary text-lg" />,
      label: t("wishlist"),
      href: "/wishlist",
    },
    {
      icon: <FiSettings className="text-primary text-lg" />,
      label: t("settings"),
      href: "/settings",
    },
  ];
};

const useProfilePopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();
  const pathname = usePathname();
  const { logout, isPending } = useLogout();

  const handleToggle = () => {
    isLogin && setIsOpen(!isOpen);
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
    className={className + (src ? "" : " dark:invert")}
    alt={name || "User avatar"}
  />
);

const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => (
  <SmartLink prefetchOnVisible href={item.href}>
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg-secondary transition-colors duration-200">
      {item.icon}
      <span className="text-gray-700 dark:text-dark-text">{item.label}</span>
    </div>
  </SmartLink>
);

const PopoverContent: React.FC<{
  user: { name?: string; email?: string; profileImg?: string } | null;
  onLogout: () => void;
  isPending: boolean;
}> = ({ user, onLogout, isPending }) => {
  const t = useTranslations("Profile");
  const menuItems = useMenuItems();

  return (
    <div className="pt-3">
      <div className="pb-3 border-b border-gray-100 dark:border-dark-border/50">
        <div className="flex items-center gap-3">
          <UserAvatar
            src={user?.profileImg}
            size={40}
            className="border-2 border-primary/20"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-dark-text truncate">
              {user?.name || t("user.guest")}
            </h4>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary truncate">
              {user?.email || t("user.loginPrompt")}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        {menuItems.map((item) => (
          <MenuItem key={item.href} item={item} />
        ))}

        <div className="px-2 mt-2 pt-2 border-t border-gray-100 dark:border-dark-border/50">
          <button
            onClick={onLogout}
            disabled={isPending}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <FiLogOut className="text-lg" />
            <span>{isPending ? t("menu.loggingOut") : t("menu.logout")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProfileIcon = () => {
  const user = useUserStore((state) => state.user);
  const isLogin = useAuthStore((state) => state.isLogin);
  const xs = useBreakPoints("xs");
  const { isOpen, isPending, handleToggle, handleLogout } = useProfilePopover();
  const t = useTranslations("Profile.user");

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
      {isLogin ? (
        <div className="flex items-center gap-3 cursor-pointer group">
          <UserAvatar
            src={user?.profileImg}
            name={user?.name}
            className="border-2 border-transparent group-hover:border-primary/20 transition-colors"
          />

          <div className="hidden md:block">
            <p
              dir="ltr"
              className="text-sm max-w-[100px] truncate font-medium text-gray-700 group-hover:text-primary transition-colors dark:text-dark-text"
            >
              {user?.name}
            </p>
            {/* <p className="text-xs text-gray-500 truncate max-w-[150px]">
              {user?.email}
            </p> */}
          </div>
        </div>
      ) : (
        <div>
          {/* <p className="text-sm font-medium text-gray-700 dark:text-dark-text">
            {t("guest")}
          </p> */}
          <SmartLink
            prefetchOnHover
            href="/auth/login"
            className=" hover:text-primary hover:underline transition-all duration-200 text-sm sm:text-base"
          >
            {t("loginButton")}
          </SmartLink>
        </div>
      )}
    </Popover>
  );
};

export default memo(ProfileIcon);
