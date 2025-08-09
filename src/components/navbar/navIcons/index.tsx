"use client";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { Drawer } from "antd";
import { useTranslations } from "next-intl";
import { memo, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import CartModal from "../cartModel";
import AdminDashboard from "./adminDashboard";
import ChangeLanguage from "./changeLanguage";
import ProfileIcon from "./profileIcon";
import ThemeToggle from "./themeToggle";
import WishListHeart from "./wishListHeart";

const NavIcons = () => {
  const lg = useBreakPoints("lg");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("Menu.drawer");

  // Desktop Layout
  if (lg) {
    return (
      <section className="flex items-center gap-2 md:gap-4 xl:gap-6">
        <ChangeLanguage />
        <ThemeToggle />
        <ProfileIcon />
        <AdminDashboard />
        <WishListHeart />
        <CartModal />
      </section>
    );
  }

  // Mobile Layout
  return (
    <section className="flex items-center gap-4">
      <AdminDashboard />
      <ProfileIcon />
      <CartModal />
      <IoIosMenu
        size={28}
        className="cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />

      <Drawer
        width="80%"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        placement="right"
        closeIcon={null}
        title={t("title")}
        styles={{
          body: {
            padding: "20px",
            backgroundColor: "var(--background)",
          },
          header: {
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--background)",
          },
        }}
      >
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-4 flex-1">
            <ChangeLanguage mobile />
            <ThemeToggle mobile />
            <WishListHeart mobile />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              {t("footer")}
            </p>
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default memo(NavIcons);
