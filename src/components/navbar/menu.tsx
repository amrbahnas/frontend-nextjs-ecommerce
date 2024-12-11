"use client";
import { Drawer } from "antd";
import Link from "next/link";
import React from "react";
import { IoIosMenu } from "react-icons/io";
import { useTranslations } from "next-intl";

const Menu = () => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('Menu');

  return (
    <div>
      <IoIosMenu
        size={28}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      <Drawer width={"80%"} onClose={() => setOpen(false)} open={open}>
        <div
          className="flex flex-col items-center justify-center gap-8"
          style={{ height: "100%" }}
        >
          <Link href={"/"}>{t('home')}</Link>
          <Link href={"/products"}>{t('shop')}</Link>
          <Link href={"/deals"}>{t('deals')}</Link>
          <Link href={"/about"}>{t('about')}</Link>
          <Link href={"/contact"}>{t('contact')}</Link>
          <Link href={"/logout"}>{t('logout')}</Link>
          <Link href={"/cart"}>{t('cart', { count: 1 })}</Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
