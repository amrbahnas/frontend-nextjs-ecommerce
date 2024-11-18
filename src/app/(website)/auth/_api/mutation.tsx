import useUserStore from "../../../../store/useUserStore";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useParamsService from "@/hooks/global/useParamsService";
import useMutation from "@/hooks/apiHandler/useMutation";
import useQuery from "@/hooks/apiHandler/useQuery";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { setUser } = useUserStore();

  const { getParams } = useParamsService({});
  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/login");
  const {
    data: googleData,
    error: googleError,
    isPending: googlePending,
    refetch: googleLogin,
  } = useQuery("/auth/google", {
    skip: true,
  });

  const onLoginSuccess = (data: { token: string; data: User }) => {
    if (!data.token) return;
    setUser(data.data);
    setAuthData({ token: data.token, role: data.data.role });
    const redirect = getParams("redirect");
    if (!data.data.emailVerified) {
      if (redirect) {
        return router.push(`/verifyEmail?redirect=${redirect}`);
      }
      return router.push("/verifyEmail");
    }

    router.push(redirect || "/");
  };

  const login = (values: { email: string; password: string }) => {
    mutate(values, {
      onSuccess: ({ data }) => onLoginSuccess(data),
    });
  };

  const googleLoginHandler = async (data: { token: string; data: any }) => {
    console.log("🚀 ~ googleLoginHandler ~ data:", data);
    onLoginSuccess(data);
  };

  return {
    login,
    data,
    loginError: error,
    loginPending: isPending,
    loginIsSuccess: isSuccess,
    loginIsError: isError,
    googleLogin: googleLoginHandler,
    googleData,
    googleError,
    googlePending,
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
        if (!data.token) return;
        setUser(data.data);
        setAuthData({ token: data.token, role: data.data.role });
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
  const router = useRouter();
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
