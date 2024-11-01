import useMutation from "@/hooks/apiHandler/useMutation";

export const useAdminCreateCategory = () => {
  const { mutate: createCategory, isPending: createLoading } = useMutation(
    "/categories",
    "post"
  );
  return {
    createCategory,
    createLoading,
  };
};

export const useAdminEditCategory = (id: string | undefined) => {
  const { mutate: editCategory, isPending: editLoading } = useMutation(
    "/categories/" + id,
    "put"
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
    "delete"
  );
  return {
    deleteCategory,
    deleteLoading,
  };
};
