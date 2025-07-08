"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, Tooltip } from "antd";
import { IoLanguage } from "react-icons/io5";

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, "");
    // Add the new locale
    router.push(`/${newLocale}${newPathname}`);
  };

  return (
    <Tooltip
      title={currentLocale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Button
        type="text"
        onClick={toggleLanguage}
        className="flex items-center justify-center gap-2 w-fit !m-0 !px-2 !py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
      >
        <IoLanguage className="text-lg opacity-70" />
        <span className="text-sm font-medium">
          {currentLocale === "en" ? "Arabic" : "English"}
        </span>
      </Button>
    </Tooltip>
  );
};

export default ChangeLanguage;
