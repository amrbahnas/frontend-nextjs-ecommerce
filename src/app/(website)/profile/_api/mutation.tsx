import { toast } from "react-toastify";
import useMutation from "../../../../hooks/useMutation";

export const useUpdateUser = (refetch: any) => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    "/users/update-me",
    "put"
  );
  const updateUser = (values: any) => {
    mutate(values, {
      onSuccess: (result) => {
        refetch();
        toast("Updated Successfully");
      },
    });
  };
  return {
    updateUser,
    updateUserIsPending: isPending,
    updateUserIsSuccess: isSuccess,
    updateUserError: error,
  };
};
