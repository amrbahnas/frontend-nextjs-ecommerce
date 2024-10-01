"use client";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NextImage from "../nextImage";

const Menu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <NextImage
        src="/menu.png"
        width={28}
        height={28}
        alt="menu"
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      <Drawer onClose={() => setOpen(false)} open={open}>
        <div
          className="flex flex-col items-center justify-center gap-8"
          style={{ height: "100%" }}
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Shop</Link>
          <Link href={"/about"}>Deals</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/about"}>Contact</Link>
          <Link href={"/about"}>Logout</Link>
          <Link href={"/about"}>Cart(1)</Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
