"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import { IoLanguage } from "react-icons/io5";

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";

  if (process.env.NEXT_PUBLIC_ENV !== "development") {
    return null;
  }

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, "");
    // Add the new locale
    router.push(`/${newLocale}${newPathname}`);
  };

  return (
    <Button
      type="text"
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-1 w-fit !m-0 !p-0"
      // icon={<IoLanguage className="text-lg" />}
    >
      {currentLocale === "en" ? "Arabic" : "English"}
    </Button>
  );
};

export default ChangeLanguage;
