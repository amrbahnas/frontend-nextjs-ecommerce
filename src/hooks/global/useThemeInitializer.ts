"use client";
import { useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";

export const useThemeInitializer = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    // Ensure theme is applied to document on initial load
    const root = window.document.documentElement;

    // Remove any existing theme classes
    root.classList.remove("light", "dark");

    // Add current theme class
    root.classList.add(theme);

    // Update meta theme-color based on current theme
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#0f172a" : "#F35C7A"
      );
    }
  }, [theme]);

  return theme;
};
