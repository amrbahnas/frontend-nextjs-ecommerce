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

// change email
export const useChangeEmailActions = () => {
  const {
    mutate: sendChangeEmailCode,
    data: sendChangeEmailCodeData,
    error: sendChangeEmailCodeError,
    isError: sendChangeEmailCodeIsError,
    isPending: sendChangeEmailCodeIsPending,
    isSuccess: sendChangeEmailCodeIsSuccess,
  } = useMutation("/auth/request-change-email-code", "post");

  const {
    mutate: changeEmail,
    data: changeEmailData,
    error: changeEmailError,
    isError: changeEmailIsError,
    isPending: changeEmailIsPending,
    isSuccess: changeEmailIsSuccess,
  } = useMutation("/auth/change-email", "post");

  return {
    sendChangeEmailCode,
    sendChangeEmailCodeData,
    sendChangeEmailCodeError,
    sendChangeEmailCodeIsError,
    sendChangeEmailCodeIsPending,
    sendChangeEmailCodeIsSuccess,
    changeEmail,
    changeEmailData,
    changeEmailError,
    changeEmailIsError,
    changeEmailIsPending,
    changeEmailIsSuccess,
    loading: sendChangeEmailCodeIsPending || changeEmailIsPending,
  };
};
