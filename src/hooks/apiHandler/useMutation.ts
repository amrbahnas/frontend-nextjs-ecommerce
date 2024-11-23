import axiosInstance from "@/config/apiClient";
import useAuthStore from "@/store/useAuthStore";
import { useMutation as reactUseMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useResetAppData } from "../global/useResetAppData";

const useMutation = (
  endpoint: string,
  method: "post" | "put" | "delete" = "post",
  options?: {
    onSuccess?: (a: any, b: any, c: any) => void;
    onError?: (a: any, b: any, c: any) => void;
  }
) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useResetAppData("/login");

  const { error, ...result } = reactUseMutation<
    AxiosResponse<any, any>,
    CustomError,
    any,
    unknown
  >({
    mutationFn: (body: any) => {
      if (method === "delete") {
        return axiosInstance.delete(endpoint);
      }
      return axiosInstance[method](endpoint, body as any);
    },

    onSuccess: (result, variables, context) => {
      // variables => body sended
      // context => {queryClient, queryKey, queryVariables}
      // result => response from server
      options?.onSuccess && options.onSuccess(result, variables, context);
    },

    onError: (error, variables, context) => {
      process.env.NEXT_PUBLIC_ENV === "development" &&
        toast.error(error?.response?.data || "Internal Server Error");

      if (error.response?.status === 401 && isLogin) {
        logout();
      }
      options?.onError && options.onError(error, variables, context);
    },
  });

  const renderedError = errorMessageHandler(error);

  return {
    error: renderedError,
    ...result,
  };
};

export default useMutation;

const errorMessageHandler = (error: any) => {
  if (error) {
    if (typeof error?.response?.data === "string") return error?.response?.data;
    else return "Something went wrong";
  }
  return null;
};
