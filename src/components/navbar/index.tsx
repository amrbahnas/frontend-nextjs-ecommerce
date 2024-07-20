import Link from "next/link";
import React, { Suspense } from "react";
import Menu from "./menu";
import Image from "next/image";
import SearchBar from "./searchBar";
import NavIcons from "./navIcons";
import Container from "../container";

const Navbar = () => {
  return (
    <Container>
      <div className="h-20">
        {/* MOBILE */}
        <div className="flex items-center justify-between h-full md:hidden">
          <Link href={"/"}>
            <div className="text-2xl tracking-wide">Shope</div>
          </Link>
          <Menu />
        </div>
        {/*  Bigger screen */}
        <div className="hidden md:flex items-center justify-between h-full">
          {/* left */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href={"/"} className="flex items-center gap-3 ">
              <Image src="/logo.png" width={24} height={24} alt="logo" />
              <div className="text-2xl tracking-wide">Shope</div>
            </Link>
            <div className="hidden xl:flex gap-4">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Shop</Link>
              <Link href={"/"}>Deals</Link>
              <Link href={"/"}>About</Link>
              <Link href={"/"}>Contact</Link>
            </div>
          </div>
          {/* Right */}
          <div className="w-2/3 xl:w-1/2 flex items-center   gap-8 ">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchBar />
            </Suspense>
            <NavIcons />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
