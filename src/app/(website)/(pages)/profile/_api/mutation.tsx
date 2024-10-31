import { toast } from "react-toastify";
import useMutation from "../../../../../hooks/useMutation";
import useAuthStore from "@/store/useAuthStore";

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
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    "/users/change-password",
    "put"
  );
  const changePassword = (values: any) => {
    mutate(values, {
      onSuccess: (result) => {
        const token = result.data.token;
        setAuthData({ token });
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
