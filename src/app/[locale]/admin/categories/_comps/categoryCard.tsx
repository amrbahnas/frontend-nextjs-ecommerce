"use client";

import { Button, Divider, Popconfirm, Tooltip } from "antd";
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { useAdminDeleteCategory } from "../_api/action";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("admin.categories.card");
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
          toast.success(t("actions.success"));
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
    <div className="relative flex flex-col items-center bg-white dark:bg-dark-bg   rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative w-full h-40 flex justify-center items-center overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-center object-cover absolute top-0 start-0"
        />
        <div className="w-full h-full text-white bg-black/20 flex justify-end p-4 items-start gap-1 absolute z-30">
          <Button
            type="text"
            onClick={updateCategory}
            className="!text-white !p-0 !m-0"
            icon={<MdEdit size={25} className="hover:!text-blue-300" />}
            aria-label={t("actions.edit")}
          />
          <Popconfirm
            onConfirm={removeCategory}
            title={t("actions.delete.title")}
            okText={t("actions.delete.confirm")}
            cancelText={t("actions.delete.cancel")}
          >
            <Button
              disabled={deleteLoading}
              loading={deleteLoading}
              type="text"
              className="!text-white !p-0 !m-0"
              icon={
                <TiDeleteOutline size={25} className="hover:!text-primary" />
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
        <div className="flex justify-between items-center">
          <span>{t("products")}:</span>
          <span>{category._count.products}</span>
        </div>
        <Tooltip
          title={
            <div className="flex flex-col gap-2">
              {category.subCategories.map((subCategory) => (
                <div
                  className="flex justify-between items-center"
                  key={subCategory.id}
                >
                  <span>{subCategory.name}</span>
                </div>
              ))}
            </div>
          }
        >
          <div className="flex justify-between items-center w-full">
            <span>{t("subCategories")}:</span>
            <span>{category.subCategories.length}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default CategoryCard;
