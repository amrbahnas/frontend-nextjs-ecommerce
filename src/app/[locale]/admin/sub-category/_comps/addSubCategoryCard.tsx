"use client";

import { IoIosAddCircleOutline } from "react-icons/io";

const AddSubCategoryCard = ({
  setVisible,
}: {
  setVisible: (value: boolean) => void;
}) => {
  return (
    <div
      onClick={() => setVisible(true)}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer min-h-[160px] border-2 border-dashed border-gray-200 hover:border-blue-400"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <IoIosAddCircleOutline
          size={48}
          className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 transform group-hover:scale-110"
        />
        <h1 className="mt-4 text-lg font-semibold text-gray-600 group-hover:text-blue-600 transition-colors duration-300 text-nowrap">
          Create Sub Category
        </h1>
      </div>
    </div>
  );
};

export default AddSubCategoryCard;
