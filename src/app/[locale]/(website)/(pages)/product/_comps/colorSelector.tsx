import { useTranslations } from "next-intl";
import React from "react";

const ColorSelector = ({
  availableColors,
  selectedColor,
  setSelectedColor,
}: {
  availableColors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}) => {
  const t = useTranslations("AddProduct");
  if (availableColors.length === 0) return null;

  return (
    <div>
      <h4 className="font-medium mb-2">{t("colors")}</h4>
      <div className="flex gap-2 items-center">
        {availableColors.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-md cursor-pointer ${
              selectedColor === color
                ? `border-2 border-primary scale-110`
                : `border border-gray-300`
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
