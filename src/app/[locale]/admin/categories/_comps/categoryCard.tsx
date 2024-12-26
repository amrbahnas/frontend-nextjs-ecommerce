"use client";

import { Button, Divider, Popconfirm } from "antd";
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
    <div className=" group relative flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
      <div className="p-4 flex justify-center items-center">
        <h1>{category.name}</h1>
      </div>
    </div>
  );
};

export default CategoryCard;
