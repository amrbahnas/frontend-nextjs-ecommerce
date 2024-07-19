import Cookies from "js-cookie";
import useMutation from "../../../../hooks/useMutation";
import useUserStore from "../../../../store/useUserStore";
import { useRouter } from "next/navigation";
import { SCREENS } from "../forgot-password/page";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/login");
  const login = (values: { email: string; password: string }) => {
    mutate(values, {
      onSuccess: ({ data }: any) => {
        if (!data.token) return;
        setUser(data.data);
        Cookies.set("token", "bearer " + data.token);
        Cookies.set("isLogin", "true");
        router.push("/");
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
  const { setUser } = useUserStore();
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
        Cookies.set("token", "bearer " + data.token);
        Cookies.set("isLogin", "true");
        router.push("/");
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
