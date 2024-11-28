import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import useMutation from "@/hooks/apiHandler/useMutation";

export const useUpdateUser = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    "/users/update-me",
    "put"
  );

  return {
    updateUser: mutate,
    updateUserIsPending: isPending,
    updateUserIsSuccess: isSuccess,
    updateUserError: error,
  };
};

/// change password
export const useChangePassword = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    "/users/change-password",
    "put"
  );
  const changePassword = (values: any) => {
    mutate(values, {
      onSuccess: (result) => {
        toast("Password Changed Successfully");
      },
    });
  };
  return {
    changePassword,
    changePasswordIsPending: isPending,
    changePasswordIsSuccess: isSuccess,
    changePasswordError: error,
  };
};
