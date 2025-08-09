"use client";
import useAuthStore from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Container from "../ui/container";
import DisableLink from "../ui/disableLink";
import NextImage from "../ui/nextImage";
import NavIcons from "./navIcons";
import SearchBar from "./searchBar";

const Navbar = () => {
  const pathName = usePathname();
  const t = useTranslations("Navigation");
  const isAdmin = useAuthStore((state) => state.isAdmin);

  return (
    <Container className="shadow-sm bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
      <div className="min-h-20 flex  flex-col  justify-center py-2 lg:py-4 ">
        <div className="flex items-center justify-between h-full ">
          {/* left */}
          <DisableLink
            disabled={pathName === "/verifyEmail"}
            href={"/"}
            className="flex items-center gap-1 lg:gap-3 "
          >
            <NextImage src="/logo.png" width={40} height={40} alt="logo" />

            <h1 className="   text-md sm:text-2xl tracking-wide select-none  text-transparent  bg-clip-text bg-gradient-to-r from-primary to-yellow-500 font-bold ">
              {t("brand")}
            </h1>
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
