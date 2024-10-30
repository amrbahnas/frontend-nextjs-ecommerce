"use client";
import React from "react";
import { useGetAdminCategories } from "../products/_api/query";
import NextImage from "@/components/ui/nextImage";
import { Divider, Spin } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import CategoryModal from "./_comps/categoryModal";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useAdminDeleteCategory } from "./_api/action";
import { toast } from "react-toastify";
import AdminPageTile from "../_comps/adminPageTile";

const Page = () => {
  const { categories, isLoading, refetch } = useGetAdminCategories();
  const [visible, setVisible] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [deleteCategoryLoading, setDeleteCategoryLoading] =
    React.useState(false);
  return (
    <div>
      <AdminPageTile>Categories</AdminPageTile>
      <span className=" capitalize text-sm text-black my-4 block w-full text-right">
        {categories.length} items found
      </span>
      <Spin
        spinning={isLoading || deleteCategoryLoading}
        tip="Loading..."
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              setCategory={setCategory}
              setVisible={setVisible}
              refetch={refetch}
              setDeleteCategoryLoading={setDeleteCategoryLoading}
            />
          ))}
          <AddCategoryCard setVisible={setVisible} />
        </div>
      </Spin>
      <CategoryModal
        category={category}
        refetch={refetch}
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
      />
    </div>
  );
};

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
  const { deleteCategory } = useAdminDeleteCategory(category?._id);
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
    <div className=" flex flex-col items-center bg-gray-100 hover:shadow-lg translate transition-all rounded-md overflow-hidden ">
      <div className=" relative w-full h-40  flex justify-center items-center  overflow-hidden">
        <img
          src={category.image}
          alt=""
          className="w-full h-full object-center object-cover absolute top-0 left-0"
        />
        <div className="  w-full h-full  text-white bg-black/20 flex justify-end p-4 items-start gap-3 absolute z-30">
          <button type="button" onClick={updateCategory}>
            <MdEdit size={25} className=" hover:!text-blue-600" />
          </button>
          <button type="button" onClick={removeCategory}>
            <TiDeleteOutline size={25} className=" hover:!text-primary" />
          </button>
        </div>
      </div>

      <Divider className="!my-1" />
      <div className="p-4 flex justify-center items-center">
        <h1>{category.name}</h1>
      </div>
    </div>
  );
};
const AddCategoryCard = ({
  setVisible,
}: {
  setVisible: (value: boolean) => void;
}) => {
  return (
    <div
      className=" flex  bg-gray-100  cursor-pointer  justify-center items-center flex-col rounded-md min-h-40 hover:shadow-lg translate transition-all"
      onClick={() => {
        setVisible(true);
      }}
    >
      <IoIosAddCircleOutline size={50} className=" !text-gray-800" />
      <span>
        <h1>Create Category</h1>
      </span>
    </div>
  );
};

export default Page;
