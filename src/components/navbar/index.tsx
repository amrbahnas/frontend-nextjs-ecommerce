"use client";
import { usePathname } from "next/navigation";
import Container from "../container";
import DisableLink from "../ui/disableLink";
import NextImage from "../ui/nextImage";
import Menu from "./menu";
import NavIcons from "./navIcons";
import { PageLinks } from "./pageLinks";
import SearchBar from "./searchBar";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <Container className=" shadow-sm">
      <div className="min-h-20 flex  flex-col  justify-center py-2 md:py-4 ">
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
          <PageLinks />
          {/* Big screen */}
          <div className="w-2/3 xl:w-1/2 hidden md:flex items-center   gap-8 ">
            <SearchBar />
            <NavIcons />
          </div>
          <div className="flex items-center gap-6">
            {/* Mobile */}
            <div className="flex md:hidden items-center justify-between h-full gap-3">
              <NavIcons />
              <Menu />
            </div>
          </div>
        </div>
        {/*  mobile */}
        <div className=" mt-3 block md:hidden ">
          <SearchBar />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
