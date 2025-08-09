"use client";
import { memo } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import useThemeStore from "@/store/useThemeStore";
import { useTranslations } from "next-intl";

const ThemeToggle = ({ mobile = false }: { mobile?: boolean }) => {
  const { theme, toggleTheme } = useThemeStore();
  const t = useTranslations("Menu.drawer");

  const icon =
    theme === "light" ? (
      <MdDarkMode
        size={20}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
      />
    ) : (
      <MdLightMode
        size={20}
        className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
      />
    );
  if (mobile) {
    return (
      <div
        onClick={toggleTheme}
        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-400 text-lg">
              🎨
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {t("theme.title")}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("theme.description")}
            </p>
          </div>
        </div>
        {icon}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {icon}
    </button>
  );
};

export default memo(ThemeToggle);
