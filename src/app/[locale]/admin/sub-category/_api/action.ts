import useMutation from "@/hooks/apiHandler/useMutation";

export const useAdminCreateSubCategory = () => {
  const { mutate: createSubCategory, isPending: createLoading } =
    useMutation("/sub-categories");
  return {
    createSubCategory,
    createLoading,
  };
};

export const useAdminEditSubCategory = (id: string | undefined) => {
  const { mutate: editSubCategory, isPending: editLoading } = useMutation(
    "/sub-categories/" + id,
    { method: "patch" }
  );
  return {
    editSubCategory,
    editLoading,
  };
};

// delete category
export const useAdminDeleteSubCategory = (id: string) => {
  const { mutate: deleteSubCategory, isPending: deleteLoading } = useMutation(
    `/sub-categories/${id}`,
    { method: "delete" }
  );
  return {
    deleteSubCategory,
    deleteLoading,
  };
};
