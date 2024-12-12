import useUserStore from "@/store/useUserStore";
import { Avatar, Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useLogout } from "@/hooks/global/useLogout";

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
        <div className="flex flex-col gap-2">
          <Link href="/profile">
            <Button
              className="mt-2 cursor-pointer"
              onClick={() => setIsProfileOpen(false)}
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
  );
};

export default memo(ProfileIcon);
