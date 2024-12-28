"use client";
import { useTranslations } from "next-intl";
import React from "react";

// Helper function to get a friendly color name
const getColorName = (color: string) => {
  // Remove # if present and convert to lowercase
  const normalizedColor = color.replace('#', '').toLowerCase();
  
  // Common color map
  const colorNames: { [key: string]: string } = {
    ff0000: 'Red',
    '00ff00': 'Green',
    '0000ff': 'Blue',
    ffff00: 'Yellow',
    ff00ff: 'Pink',
    '00ffff': 'Cyan',
    ffffff: 'White',
    '000000': 'Black',
    '808080': 'Gray',
    ffa500: 'Orange',
    '800080': 'Purple',
    a52a2a: 'Brown',
  };

  return colorNames[normalizedColor] || color;
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
  const t = useTranslations("AddProduct");
  if (availableColors.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">{t("colors")}</h4>
      <div className="flex flex-wrap gap-4">
        {availableColors.map((color) => (
          <div 
            key={color} 
            className="flex flex-col items-center gap-1"
          >
            <button
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer
                ${selectedColor === color 
                  ? 'ring-2 ring-primary' 
                  : 'ring-1 ring-gray-200 hover:ring-2'
                }
              `}
              style={{ backgroundColor: color }}
              title={color}
            />
            <span className="text-xs text-gray-600 capitalize">
              {getColorName(color)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
