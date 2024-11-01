import Cookies from "js-cookie";
import { useMutation as reactUseMutation } from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/apiClient";

const useMutation = (
  endpoint: string,
  method: "post" | "put" | "delete" = "post",
  options?: {
    onSuccess?: (a: any, b: any, c: any) => void;
    onError?: (a: any, b: any, c: any) => void;
  }
) => {
  const route = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const config: AxiosRequestConfig<any> = {
    headers: {
      Authorization: "Bearer " + (Cookies.get("token") || ""),
    },
  };

  const { error, ...result } = reactUseMutation<
    AxiosResponse<any, any>,
    CustomError,
    any,
    unknown
  >({
    mutationFn: (body: any) => {
      if (method === "delete") {
        return axiosInstance.delete(endpoint, config);
      }
      return axiosInstance[method](endpoint, body as any, config);
    },

    onSuccess: (result, variables, context) => {
      // variables => body sended
      // context => {queryClient, queryKey, queryVariables}
      // result => response from server
      options?.onSuccess && options.onSuccess(result, variables, context);
    },

    onError: (error, variables, context) => {
      toast.error(error?.response?.data || "Internal Server Error");
      if (error.response?.status === 401 && isLogin) {
        route.push("/auth/login");
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

// Replace optimistic todo in the todos list with the result
// queryClient.setQueryData([endpoint], (old) =>
//   old.map((todo) =>
//     todo.id === context.optimisticTodo.id ? result : todo
//   )
// );
