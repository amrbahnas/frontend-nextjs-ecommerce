import useMutation from "@/hooks/apiHandler/useMutation";
import toast from "react-hot-toast";

/// change password
export const useChangePassword = () => {
  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate: changePassword,
  } = useMutation("/auth/change-password", { method: "put" });

  return {
    changePassword,
    changePasswordIsPending: isPending,
    changePasswordIsSuccess: isSuccess,
    changePasswordError: error,
  };
};
