"use client";
import { useThemeInitializer } from "@/hooks/global/useThemeInitializer";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useThemeInitializer();

  return <>{children}</>;
};

export default ThemeProvider;
