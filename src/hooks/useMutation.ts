import axiosInstance from "../config/apiClient";
import Cookies from "js-cookie";
import { useMutation as reactUseMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosRequestConfig } from "axios";

const useMutation = (
  endpoint: string,
  method: "post" | "put" | "delete" = "post",
  options?: {
    onSuccess?: (a: any, b: any, c: any) => void;
    onError?: (a: any, b: any, c: any) => void;
  }
) => {
  const config: AxiosRequestConfig<any> = {
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  const { error, ...result } = reactUseMutation({
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
      //@ts-ignore
      // toast.error(error?.response?.data || "Something went wrong");
      options?.onError && options.onError(error, variables, context);
    },
  });

  return {
    //@ts-ignore
    error: error?.response?.data,
    ...result,
  };
};

export default useMutation;

// Replace optimistic todo in the todos list with the result
// queryClient.setQueryData([endpoint], (old) =>
//   old.map((todo) =>
//     todo.id === context.optimisticTodo.id ? result : todo
//   )
// );
