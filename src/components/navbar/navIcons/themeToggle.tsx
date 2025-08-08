"use client";
import { memo } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import useThemeStore from "@/store/useThemeStore";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MdDarkMode
          size={20}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        />
      ) : (
        <MdLightMode
          size={20}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
        />
      )}
    </button>
  );
};

export default memo(ThemeToggle);
