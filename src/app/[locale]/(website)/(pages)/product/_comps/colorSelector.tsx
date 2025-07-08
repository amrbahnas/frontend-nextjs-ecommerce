"use client";
import { useTranslations } from "next-intl";
import React from "react";

// Helper function to get a friendly color name
const getColorName = (color: string, t: any) => {
  // Remove # if present and convert to lowercase
  const normalizedColor = color.replace("#", "").toLowerCase();

  // Common color map
  const colorMap: { [key: string]: string } = {
    ff0000: "red",
    "00ff00": "green",
    "0000ff": "blue",
    ffff00: "yellow",
    ff00ff: "pink",
    "00ffff": "cyan",
    ffffff: "white",
    "000000": "black",
    "808080": "gray",
    ffa500: "orange",
    "800080": "purple",
    a52a2a: "brown",
  };

  const colorKey = colorMap[normalizedColor];
  return colorKey ? t(`colorNames.${colorKey}`) : color;
};

const ColorSelector = ({
  availableColors,
  selectedColor,
  setSelectedColor,
}: {
  availableColors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}) => {
  const t = useTranslations("ProductDetails");
  if (availableColors.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t("colors")}</h4>
      <div className="flex flex-wrap gap-4">
        {availableColors.map((color) => (
          <div key={color} className="flex flex-col items-center gap-1">
            <button
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer
                ${
                  selectedColor === color
                    ? "ring-2 ring-primary"
                    : "ring-1 ring-gray-200 hover:ring-2"
                }
              `}
              style={{ backgroundColor: color }}
              title={getColorName(color, t)}
            />
            <span className="text-xs text-gray-600 capitalize">
              {getColorName(color, t)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
