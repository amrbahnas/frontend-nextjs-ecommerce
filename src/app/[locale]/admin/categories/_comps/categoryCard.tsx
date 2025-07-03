"use client";

import { Button, Divider, Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useAdminDeleteCategory } from "../_api/action";

const CategoryCard = ({
  category,
  setCategory,
  setVisible,
  refetch,
  setDeleteCategoryLoading,
}: {
  category: CategoryType;
  setCategory: any;
  setVisible: any;
  refetch: any;
  setDeleteCategoryLoading: any;
}) => {
  const { deleteCategory, deleteLoading } = useAdminDeleteCategory(
    category?.id
  );
  const updateCategory = () => {
    setCategory(category);
    setVisible(true);
  };

  const removeCategory = () => {
    setDeleteCategoryLoading(true);
    deleteCategory(
      {},
      {
        onSuccess: () => {
          toast.success("Category Deleted");
          setDeleteCategoryLoading(false);
          refetch();
        },
        onError: (error) => {
          toast.error(error.message);
          setDeleteCategoryLoading(false);
        },
      }
    );
  };
  return (
    <div className="   relative flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ">
      <div className=" relative w-full h-40  flex justify-center items-center  overflow-hidden">
        <img
          src={category.image}
          alt=""
          className="w-full h-full object-center object-cover absolute top-0 left-0"
        />
        <div className="  w-full h-full  text-white bg-black/20 flex justify-end p-4 items-start gap-1 absolute z-30">
          {/* <button type="button" onClick={updateCategory}>
              <MdEdit size={25} className=" hover:!text-blue-600" />
            </button> */}
          <Button
            type="text"
            onClick={updateCategory}
            className=" !text-white !p-0 !m-0"
            icon={<MdEdit size={25} className=" hover:!text-blue-300" />}
          />
          <Popconfirm
            onConfirm={removeCategory}
            title="Are you sure to delete this category?"
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={deleteLoading}
              loading={deleteLoading}
              type="text"
              className=" !text-white !p-0 !m-0"
              icon={
                <TiDeleteOutline size={25} className="  hover:!text-primary" />
              }
            />
          </Popconfirm>
        </div>
      </div>

      <Divider className="!my-1" />
      <div className="p-2 flex justify-center items-center text-lg sm:text-xl capitalize">
        <h1 className="truncate w-[80%]">{category.name}</h1>
      </div>
      <div className="flex flex-col gap-2 border-t w-full p-3">
        <div className=" flex justify-between items-center  ">
          <span>Products:</span>
          <span>{category._count.products}</span>
        </div>
        <Tooltip
          title={
            <div className="flex flex-col gap-2">
              {category.subCategories.map((subCategory) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={subCategory.id}
                  >
                    <span>{subCategory.name}</span>
                  </div>
                );
              })}
            </div>
          }
        >
          <div className="  flex justify-between items-center  w-full ">
            <span>Sub Categories:</span>
            <span>{category.subCategories.length}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default CategoryCard;
