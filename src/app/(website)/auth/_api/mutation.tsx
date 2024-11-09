import useUserStore from "../../../../store/useUserStore";
import { useRouter } from "next/navigation";
import { FORGET_PASSWORD_SCREENS as SCREENS } from "../../../../enum/pagesScreens";
import useAuthStore from "@/store/useAuthStore";
import useParamsService from "@/hooks/global/useParamsService";
import useMutation from "@/hooks/apiHandler/useMutation";

export const useLogin = () => {
  const { setUser } = useUserStore();
  const { getParams } = useParamsService({});
  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/login");
  const login = (values: { email: string; password: string }) => {
    mutate(values, {
      onSuccess: ({ data }: any) => {
        if (!data.token) return;
        setUser(data.data);
        setAuthData({ token: data.token, role: data.data.role });
        const redirect = getParams("redirect");
        if (!data.data.verifyEmail) {
          if (redirect) {
            return router.push(`/verifyEmail?redirect=${redirect}`);
          }
          return router.push("/verifyEmail");
        }

        router.push(redirect || "/");
      },
    });
  };

  return {
    login,
    data,
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

export const useForgetPassword = (setScreen: (a: SCREENS) => void) => {
  const router = useRouter();
  const {
    mutate: mutateSendResetCode,
    data: sendResetCodeData,
    error: sendResetCodeError,
    isError: sendResetCodeIsError,
    isPending: sendResetCodePending,
    isSuccess: sendResetCodeIsSuccess,
  } = useMutation("/auth/forgot-password");
  const sendResetCode = (values: { email: string }) => {
    mutateSendResetCode(values, {
      onSuccess: () => {
        setScreen(SCREENS.VERIFICATION_RESET_CODE);
      },
    });
  };

  const {
    mutate: mutateVerifyResetCode,
    data: verifyResetCodeData,
    error: verifyResetCodeError,
    isPending: verifyResetCodePending,
    isSuccess: verifyResetCodeIsSuccess,
    isError: verifyResetCodeIsError,
  } = useMutation("/auth/verify-resetCode-password");
  const verifyResetCode = (values: { resetCode: string }) => {
    mutateVerifyResetCode(values, {
      onSuccess: () => {
        setScreen(SCREENS.CREATE_NEW_PASSWORD);
      },
    });
  };

  const {
    mutate: mutateCreateNewPassword,
    data: createNewPasswordData,
    error: createNewPasswordError,
    isPending: createNewPasswordPending,
    isSuccess: createNewPasswordIsSuccess,
  } = useMutation("/auth/reset-password", "put");
  const createNewPassword = (values: {
    email: string;
    newPassword: string;
  }) => {
    mutateCreateNewPassword(values, {
      onSuccess: () => {
        router.push("/auth/login");
      },
    });
  };

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
