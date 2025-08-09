"use client";
import { memo } from "react";
import CartModal from "../cartModel";
import AdminDashboard from "./adminDashboard";
import ChangeLanguage from "./changeLanguage";
import ProfileIcon from "./profileIcon";
import ThemeToggle from "./themeToggle";
import WishListHeart from "./wishListHeart";

const NavIcons = () => {
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
};

export default memo(NavIcons);
