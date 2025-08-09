import { Badge } from "antd";
import { Link } from "@/i18n/navigation";
import { CiHeart } from "react-icons/ci";
import React from "react";
import useUserStore from "@/store/useUserStore";
import { SmartLink } from "@/components/ui/smartLink";
import { useTranslations } from "next-intl";

const WishListHeart = ({ mobile = false }: { mobile?: boolean }) => {
  const user = useUserStore((state) => state.user);
  const t = useTranslations("Menu.drawer");
  if (!user) return null;

  const icon = (
    <Badge
      count={user?.wishlist.length}
      size="small"
      className=" cursor-pointer  "
      color="text-primary"
    >
      <CiHeart size={25} className="hover:!text-primary hover:scale-105" />
    </Badge>
  );

  if (mobile) {
    return (
      <SmartLink
        href="/wishlist"
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <span className="text-red-600 dark:text-red-400 text-lg">❤️</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {t("wishlist.title")}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("wishlist.description")}
            </p>
          </div>
        </div>
        {icon}
      </SmartLink>
    );
  }

  return (
    <Link href={"/wishlist"} className="flex items-center justify-center">
      {icon}
    </Link>
  );
};

export default WishListHeart;
