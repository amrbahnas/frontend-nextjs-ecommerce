"use client";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Container from "../ui/container";
import DisableLink from "../ui/disableLink";
import NextImage from "../ui/nextImage";
import NavIcons from "./navIcons";
import SearchBar from "./searchBar";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <Container className=" shadow-sm">
      <div className="min-h-20 flex  flex-col  justify-center py-2 lg:py-4 ">
        <div className="flex items-center justify-between h-full ">
          {/* left */}
          <DisableLink
            disabled={pathName === "/verifyEmail"}
            href={"/"}
            className="flex items-center gap-1 lg:gap-3 "
          >
            <NextImage src="/logo.png" width={24} height={24} alt="logo" />
            <div className=" text-2xl tracking-wide">Shope</div>
          </DisableLink>

          {/* Big screen */}
          {/* <PageLinks /> */}
          <div>
            <div className=" hidden lg:flex items-center   gap-8 ">
              {/* search input with class hidden will represent at html tree to avoid two input search with same id i added customId prop*/}
              <SearchBar customId="largeId" />
              <NavIcons />
            </div>
            {/* Mobile */}
            <div className="flex items-center gap-6">
              {/* Mobile */}
              <div className="flex lg:hidden items-center justify-between h-full gap-3">
                <NavIcons />
                {/* <Menu /> */}
              </div>
            </div>
          </div>
        </div>
        {/*  mobile */}
        <div className=" mt-3 block lg:hidden ">
          <SearchBar customId="smallId" />
        </div>
      </div>
    </Container>
  );
};

export default memo(Navbar);
