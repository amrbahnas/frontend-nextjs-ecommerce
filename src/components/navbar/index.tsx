"use client";
import Container from "../container";
import Menu from "./menu";
import NavIcons from "./navIcons";
import SearchBar from "./searchBar";
import NextImage from "../ui/nextImage";
import { usePathname } from "next/navigation";
import DisableLink from "../ui/disableLink";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <Container className=" shadow-sm">
      <div className="min-h-20 flex  flex-col  justify-center py-4 ">
        <div className="flex items-center justify-between h-full ">
          {/* left */}
          <DisableLink
            disabled={pathName === "/verifyEmail"}
            href={"/"}
            className="flex items-center gap-1 md:gap-3 "
          >
            <NextImage src="/logo.png" width={24} height={24} alt="logo" />
            <div className=" text-lg md:text-2xl tracking-wide">Shope</div>
          </DisableLink>

          {/* Big screen */}
          <div className="hidden xl:flex gap-4">
            <DisableLink disabled href={"/"}>
              Home
            </DisableLink>
            <DisableLink disabled href={"/"}>
              Shop
            </DisableLink>
            <DisableLink disabled href={"/"}>
              Deals
            </DisableLink>
            <DisableLink disabled href={"/"}>
              About
            </DisableLink>
            <DisableLink disabled href={"/"}>
              Contact
            </DisableLink>
          </div>
          {/* Big screen */}
          <div className="w-2/3 xl:w-1/2 hidden md:flex items-center   gap-8 ">
            <SearchBar />
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
          <SearchBar />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
