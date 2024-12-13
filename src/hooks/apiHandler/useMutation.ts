import proxyAxiosInstance from "@/config/proxyClient";
import useAuthStore from "@/store/useAuthStore";
import { useMutation as reactUseMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useResetAppData } from "../global/useResetAppData";

const useMutation = (
  endpoint: string,
  options?: {
    method?: "post" | "put" | "delete";
    onSuccess?: (a: any, b: any, c: any) => void;
    onError?: (a: any, b: any, c: any) => void;
    useProxy?: boolean;
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
      if (options?.method === "delete") {
        return proxyAxiosInstance.delete(endpoint);
      }
      return proxyAxiosInstance[method](endpoint, body as any);
    },

    onSuccess: (result, variables, context) => {
      // variables => body sended
      // context => {queryClient, queryKey, queryVariables}
      // result => response from server
      options?.onSuccess && options.onSuccess(result, variables, context);
    },

    onError: (error, variables, context) => {
      process.env.NEXT_PUBLIC_ENV === "development" &&
        toast.error(
          JSON.stringify(error?.response?.data || "Internal Server Error")
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
    if (typeof error?.response?.data === "string") return error?.response?.data;
    else return "Something went wrong";
  }
  return null;
};
