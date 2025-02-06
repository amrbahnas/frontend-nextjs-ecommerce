import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import useMutation from "@/hooks/apiHandler/useMutation";

export const useUpdateProfile = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    "/users/update-me",
    { method: "put" }
  );

  return {
    updateProfile: mutate,
    updateProfileIsPending: isPending,
    updateProfileIsSuccess: isSuccess,
    updateProfileError: error,
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
  } = useMutation("/auth/request-change-email-code");

  const {
    mutate: changeEmail,
    data: changeEmailData,
    error: changeEmailError,
    isError: changeEmailIsError,
    isPending: changeEmailIsPending,
    isSuccess: changeEmailIsSuccess,
  } = useMutation("/auth/change-email");

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

export const useCreateAddress = () => {
  const { data, error, isError, isPending, isSuccess, mutate } =
    useMutation("/addresses");

  return {
    createAddress: mutate,
    createAddressIsPending: isPending,
    createAddressIsSuccess: isSuccess,
    createAddressError: error,
  };
};

export const useUpdateAddress = (id: string | undefined | null) => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    `/addresses/${id}`,
    { method: "patch" }
  );

  return {
    updateAddress: mutate,
    updateAddressIsPending: isPending,
    updateAddressIsSuccess: isSuccess,
    updateAddressError: error,
  };
};

//useDeleteAddress

export const useDeleteAddress = (id: string | undefined) => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation(
    `/addresses/${id}`,
    { method: "delete" }
  );

  return {
    deleteAddress: mutate,
    deleteAddressIsPending: isPending,
    deleteAddressIsSuccess: isSuccess,
    deleteAddressError: error,
  };
};
