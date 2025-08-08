"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import useThemeStore from "@/store/useThemeStore";

export default function AntDLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const direction = locale === "ar" ? "rtl" : "ltr";
  const currentTheme = useThemeStore((state) => state.theme);
  const isDark = currentTheme === "dark";

  return (
    <AntdRegistry>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Button: {
              paddingContentHorizontal: 36,
              paddingContentVertical: 20,
              fontSize: 14,
              // borderRadiusSM: 24,
              controlOutline: "",
              primaryShadow: "none",
              algorithm: true,
            },
            Table: {
              // headerBg: "rgba(169, 105, 0, 0.25)",
              // headerSortActiveBg: "rgba(169, 105, 0, 0.15)",
              // headerSortHoverBg: "rgba(169, 105, 0, 0.2)",
              cellPaddingInline: 8,
              cellPaddingBlock: 16,
              selectionColumnWidth: 12,
            },
            Divider: {},
            Menu: {
              darkItemColor: "#fff",
              itemHoverBg: isDark ? "#334155" : "#fff",
              darkItemHoverBg: "#334155",
              itemHoverColor: "#F35C7A",
              itemSelectedBg: isDark ? "#475569" : "#f1f5f9",
              itemSelectedColor: "#F35C7A",
              subMenuItemBg: isDark ? "#1e293b" : "#ffffff",
              iconSize: 18,
            },
            Layout: {
              headerHeight: 80,
              // headerPadding: ""
            },
            Input: {
              activeShadow: "none",
              algorithm: true,
            },
            Badge: {
              colorBgContainer: isDark ? "#1e293b" : "#fff",
            },
            Select: {
              optionFontSize: 12,
              optionHeight: 28,
              colorBorder: "#E9E9E9",
              // multipleItemHeight: 8,
              // multipleItemHeightLG: 24,
            },
            DatePicker: {
              activeBorderColor: "",
              hoverBorderColor: "",
              // cellHeight: 16,
              // cellWidth: 24,
              // inputFontSize: 10,
              // inputFontSizeLG: 12,
            },
            Steps: {
              dotSize: 34,
              dotCurrentSize: 34,
            },
            Form: {
              labelFontSize: 16,
              // itemMarginBottom: 24
              verticalLabelPadding: "0 0 6px 0",
            },
          },
          token: {
            fontFamily: "inherit",
            colorPrimary: "#F35C7A",
            // colorPrimaryText: "",
            colorPrimaryHover: "#F35C7A ",
            colorTextSecondary: "#6C757D",
            colorPrimaryBg: "#E9F5FF",
            // sizeStep: 6,
            fontSize: 14,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
