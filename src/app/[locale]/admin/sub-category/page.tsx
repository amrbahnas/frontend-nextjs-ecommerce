"use client";
import React from "react";

import { Button, Divider, Popconfirm, Spin } from "antd";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import AdminPageTile from "../_comps/adminPageTile";
import { useAdminDeleteSubCategory } from "./_api/action";
import SubCategoryModal from "./_comps/subCategoryModal";
import CategoryFilter from "../_comps/categoryFilter";
import { useGetAdminSubCategories } from "./_api/query";
import useParamsService from "@/hooks/global/useParamsService";

const Page = () => {
  const { getParams } = useParamsService("okay");
  const selectedCategory = getParams("category") || "";
  const { Subcategories, isLoading, refetch } = useGetAdminSubCategories({
    categoryId: selectedCategory,
  });
  const [visible, setVisible] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState<SubCategoryType | null>(
    null
  );
  const [deleteSubCategoryLoading, setDeleteSubCategoryLoading] =
    React.useState(false);
  return (
    <div>
      <AdminPageTile>Sub Category</AdminPageTile>
      <CategoryFilter />
      <span className=" capitalize text-sm text-black my-4 block w-full text-right">
        {Subcategories.length} items found
      </span>
      <Spin
        spinning={isLoading || deleteSubCategoryLoading}
        tip="Loading..."
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Subcategories?.map((subCategory) => (
            <SubCategoryCard
              key={subCategory.id}
              subCategory={subCategory}
              setSubCategory={setSubCategory}
              setVisible={setVisible}
              refetch={refetch}
              setDeleteSubCategoryLoading={setDeleteSubCategoryLoading}
            />
          ))}
          <AddSubCategoryCard setVisible={setVisible} />
        </div>
      </Spin>
      <SubCategoryModal
        subCategory={subCategory}
        refetch={refetch}
        visible={visible}
        setVisible={setVisible}
        setSubCategory={setSubCategory}
      />
    </div>
  );
};

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
    <div className=" flex flex-col items-center bg-gray-100 hover:shadow-lg translate transition-all rounded-md overflow-hidden ">
      <div className="  w-full   text-black flex justify-end p-4 items-start gap-1    ">
        <Button
          type="text"
          onClick={updateSubCategory}
          className=" !text-black !p-0 !m-0"
          icon={<MdEdit size={25} className=" hover:!text-blue-300" />}
        />
        <Popconfirm
          onConfirm={removeSubCategory}
          title="Are you sure to delete this category?"
          okText="Yes"
          cancelText="No"
        >
          <Button
            disabled={deleteLoading}
            loading={deleteLoading}
            type="text"
            className=" !text-black !p-0 !m-0"
            icon={
              <TiDeleteOutline size={25} className="  hover:!text-primary" />
            }
          />
        </Popconfirm>
      </div>

      <div className="p-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold">{subCategory.name}</h1>
      </div>
    </div>
  );
};
const AddSubCategoryCard = ({
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
        <h1>Create Sub Category</h1>
      </span>
    </div>
  );
};

export default Page;
