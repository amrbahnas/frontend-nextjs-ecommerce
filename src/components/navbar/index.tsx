"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Container from "../container";
import Menu from "./menu";
import NavIcons from "./navIcons";
import SearchBar from "./searchBar";
import NextImage from "../ui/nextImage";

const Navbar = () => {
  return (
    <Container className=" shadow-sm">
      <div className="min-h-20 flex  flex-col  justify-center py-4 ">
        <div className="flex items-center justify-between h-full ">
          {/* left */}
          <Link href={"/"} className="flex items-center gap-3 ">
            <NextImage src="/logo.png" width={24} height={24} alt="logo" />
            <div className="text-2xl tracking-wide">Shope</div>
          </Link>

          {/* Big screen */}
          <div className="hidden xl:flex gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Shop</Link>
            <Link href={"/"}>Deals</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </div>
          {/* Big screen */}
          <div className="w-2/3 xl:w-1/2 hidden md:flex items-center   gap-8 ">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
            <NavIcons />
          </div>
          <div className="flex items-center gap-6">
            {/* Mobile */}
            <div className="flex md:hidden items-center justify-between h-full gap-6">
              <NavIcons />

              <Menu />
            </div>
          </div>
        </div>
        {/*  mobile */}
        <div className=" mt-6 block md:hidden items-center justify-between h-full">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
