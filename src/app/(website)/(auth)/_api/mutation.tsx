import useUserStore from "../../../../store/useUserStore";

import useMutation from "@/hooks/apiHandler/useMutation";
import useParamsService from "@/hooks/global/useParamsService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const useLogin = () => {
  const { setUser } = useUserStore();
  const { getParams } = useParamsService({});

  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/login");

  const onLoginSuccess = (data: { data: User }) => {
    setUser(data.data);
    setAuthData({ role: data.data.role });
    const redirect = getParams("redirect");
    if (!data.data.emailVerified) {
      if (redirect) {
        return router.push(
          `/verifyEmail?status=send-code&&redirect=${redirect}`
        );
      }
      return router.push("/verifyEmail?status=send-code");
    }

    router.push(redirect || "/");
  };

  const login = (values: { email: string; password: string }) => {
    mutate(values, {
      onSuccess: ({ data }) => onLoginSuccess(data),
    });
  };

  return {
    login,
    data,
    onLoginSuccess,
    loginError: error,
    loginPending: isPending,
    loginIsSuccess: isSuccess,
    loginIsError: isError,
  };
};

export const useSignUp = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/signup");
  const signUp = (values: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  }) => {
    mutate(values, {
      onSuccess: ({ data }: any) => {
        setUser(data.data);
        setAuthData({ role: data.data.role });
        router.push("/verifyEmail");
      },
    });
  };

  return {
    signUp,
    data,
    signUpError: error,
    signUpPending: isPending,
    signUpIsSuccess: isSuccess,
    signUpIsError: isError,
  };
};

export const useForgetPassword = () => {
  const {
    mutate: sendResetCode,
    data: sendResetCodeData,
    error: sendResetCodeError,
    isError: sendResetCodeIsError,
    isPending: sendResetCodePending,
    isSuccess: sendResetCodeIsSuccess,
  } = useMutation("/auth/forgot-password");

  const {
    mutate: verifyResetCode,
    data: verifyResetCodeData,
    error: verifyResetCodeError,
    isPending: verifyResetCodePending,
    isSuccess: verifyResetCodeIsSuccess,
    isError: verifyResetCodeIsError,
  } = useMutation("/auth/verify-resetCode-password");

  const {
    mutate: createNewPassword,
    data: createNewPasswordData,
    error: createNewPasswordError,
    isPending: createNewPasswordPending,
    isSuccess: createNewPasswordIsSuccess,
  } = useMutation("/auth/reset-password", "put");

  return {
    sendResetCode,
    verifyResetCode,
    createNewPassword,
    loading:
      sendResetCodePending ||
      verifyResetCodePending ||
      createNewPasswordPending,
    data: sendResetCodeData || verifyResetCodeData || createNewPasswordData,
    error: sendResetCodeError || verifyResetCodeError || createNewPasswordError,
    isSuccess:
      sendResetCodeIsSuccess ||
      verifyResetCodeIsSuccess ||
      createNewPasswordIsSuccess,
    isError:
      sendResetCodeIsError ||
      verifyResetCodeIsError ||
      createNewPasswordIsSuccess,
  };
};

// logout
export const useLogoutApi = () => {
  const { mutate, isPending } = useMutation("/auth/logout");
  return {
    mutate,
    isPending,
  };
};
