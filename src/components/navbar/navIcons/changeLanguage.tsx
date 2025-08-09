"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, Tooltip } from "antd";
import { IoLanguage } from "react-icons/io5";
import { useTranslations, useLocale } from "next-intl";

const ChangeLanguage = ({ mobile = false }: { mobile?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = useLocale();
  const t = useTranslations("Menu.drawer");
  const label = currentLocale === "en" ? "العربية" : "English";
  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, "");
    // Add the new locale
    router.push(`/${newLocale}${newPathname}`);
  };

  if (mobile) {
    return (
      <div
        onClick={toggleLanguage}
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 text-lg">🌐</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {t("language.title")}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("language.description")}
            </p>
          </div>
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  }

  return (
    <Tooltip
      title={currentLocale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Button
        type="text"
        onClick={toggleLanguage}
        className="flex items-center justify-center gap-2 w-fit !m-0 !px-2 !py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
      >
        {/* <IoLanguage className="text-lg opacity-70" /> */}
        <span className="text-sm font-medium">{label}</span>
      </Button>
    </Tooltip>
  );
};

export default ChangeLanguage;
