import proxyAxiosInstance from "@/config/proxyClient";
import useAuthStore from "@/store/useAuthStore";
import { useMutation as reactUseMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useResetAppData } from "../global/useResetAppData";
import axiosInstance from "@/config/apiClient";
import resSanatize from "@/services/sanatizeApiRes";

const useMutation = (
  endpoint: string,
  options?: {
    method?: "post" | "put" | "delete" | "patch";
    onSuccess?: (a: any, b: any, c: any) => void;
    onError?: (a: any, b: any, c: any) => void;
    disableProxy?: boolean;
  }
) => {
  const method = options?.method || "post";
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useResetAppData();

  const { error, ...result } = reactUseMutation<
    AxiosResponse<any, any>,
    CustomError,
    any,
    unknown
  >({
    mutationFn: (body: any) => {
      const instance = options?.disableProxy
        ? axiosInstance
        : proxyAxiosInstance;
      if (options?.method === "delete") {
        return instance.delete(endpoint);
      }
      return instance[method](endpoint, body as any);
    },

    onSuccess: (result, variables, context) => {
      // variables => body sended
      // context => {queryClient, queryKey, queryVariables}
      // result => response from server
      options?.onSuccess &&
        options.onSuccess(resSanatize(result), variables, context);
    },

    onError: (error, variables, context) => {
      console.log("🚀 ~ file: useMutation.ts:46 ~ error:", error);
      process.env.NEXT_PUBLIC_ENV === "development" &&
        toast.error(
          JSON.stringify(
            error?.response?.data?.message || "Internal Server Error"
          )
        );

      if (isLogin) {
        if (error.response?.status === 401) {
          return logout("/auth/login");
        }
        if (error.response?.status === 403) {
          return logout("/inactiveAccount");
        }
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
    if (typeof error?.response?.data?.message === "string")
      return error?.response?.data?.message;
    else return "Something went wrong";
  }
  return null;
};
