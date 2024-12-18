import useMutation from "@/hooks/apiHandler/useMutation";

export const useAdminCreateCategory = () => {
  const { mutate: createCategory, isPending: createLoading } =
    useMutation("/categories");
  return {
    createCategory,
    createLoading,
  };
};

export const useAdminEditCategory = (id: string | undefined) => {
  const { mutate: editCategory, isPending: editLoading } = useMutation(
    "/categories/" + id,
    { method: "patch" }
  );
  return {
    editCategory,
    editLoading,
  };
};

// delete category
export const useAdminDeleteCategory = (id: string) => {
  const { mutate: deleteCategory, isPending: deleteLoading } = useMutation(
    `/categories/${id}`,
    { method: "delete" }
  );
  return {
    deleteCategory,
    deleteLoading,
  };
};
