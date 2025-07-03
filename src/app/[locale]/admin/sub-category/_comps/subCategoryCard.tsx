"use client";
import { Button, Popconfirm } from "antd";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useAdminDeleteSubCategory } from "../_api/action";

const SubCategoryCard = ({
  subCategory,
  setSubCategory,
  setVisible,
  refetch,
  setDeleteSubCategoryLoading,
}: {
  subCategory: SubCategoryType;
  setSubCategory: any;
  setVisible: any;
  refetch: any;
  setDeleteSubCategoryLoading: any;
}) => {
  const { deleteSubCategory, deleteLoading } = useAdminDeleteSubCategory(
    subCategory?.id
  );

  const updateSubCategory = () => {
    setSubCategory(subCategory);
    setVisible(true);
  };

  const removeSubCategory = () => {
    setDeleteSubCategoryLoading(true);
    deleteSubCategory(
      {},
      {
        onSuccess: () => {
          toast.success("Sub Category Deleted");
          setDeleteSubCategoryLoading(false);
          refetch();
        },
        onError: (error) => {
          toast.error(error.message);
          setDeleteSubCategoryLoading(false);
        },
      }
    );
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md sm:shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Actions */}
      <div className="absolute top-0 right-0 p-1 sm:p-3 flex sm:gap-2">
        <Button
          type="text"
          onClick={updateSubCategory}
          className="!text-gray-500 hover:!text-blue-500 transition-colors"
          icon={
            <MdEdit
              size={22}
              className="transition-transform group-hover:scale-110"
            />
          }
        />
        <Popconfirm
          onConfirm={removeSubCategory}
          title="Are you sure to delete this category?"
          okText="Yes"
          cancelText="No"
          placement="bottom"
        >
          <Button
            disabled={deleteLoading}
            loading={deleteLoading}
            type="text"
            className="!text-gray-500 hover:!text-red-500 transition-colors"
            icon={
              <TiDeleteOutline
                size={24}
                className="transition-transform group-hover:scale-110"
              />
            }
          />
        </Popconfirm>
      </div>

      {/* Content */}
      <div className=" px-6 pt-8 sm:p-6 flex flex-col items-center justify-center min-h-[160px]">
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center mb-2 group-hover:text-blue-600 transition-colors">
          {subCategory.name}
        </h1>
        <p className="text-sm text-gray-500 text-center">
          {subCategory.categoryName}
        </p>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 w-full flex justify-center gap-4">
          <div className="text-center flex gap-4 justify-between w-full">
            <span className="text-xs text-gray-500">Products</span>
            <p className="text-sm font-medium text-gray-700">
              {subCategory.productsCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
