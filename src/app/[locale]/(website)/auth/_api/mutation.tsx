import useUserStore from "../../../../../store/useUserStore";

import useMutation from "@/hooks/apiHandler/useMutation";
import useParamsService from "@/hooks/global/useParamsService";
import useAuthStore from "@/store/useAuthStore";
import resSanatize from "@/services/sanatizeApiRes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useCardStore from "@/store/useCardStore";
export const useLogin = () => {
  const { setUser } = useUserStore();
  const { getParams } = useParamsService({});

  const router = useRouter();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { storeCart } = useCardStore();
  const { data, error, isPending, isSuccess, isError, mutate } =
    useMutation("/auth/login");

  const onLoginSuccess = (user: User) => {
    try {
      setUser(user);
      setAuthData({ role: user.role });
      const redirect = getParams("redirect");
      if (!user.emailVerified) {
        if (redirect) {
          return router.push(
            `/verifyEmail?status=send-code&&redirect=${redirect}`
          );
        }
        return router.push("/verifyEmail?status=send-code");
      }

      router.push(redirect || "/");
    } catch (error: any) {
      toast.error(String(error));
    }
  };

  const login = (values: { email: string; password: string }) => {
    mutate(
      {
        ...values,
        cartItems:
          storeCart?.cartItems?.length > 0 ? storeCart.cartItems : undefined,
      },
      {
        onSuccess: (res) => onLoginSuccess(resSanatize(res)),
      }
    );
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
      onSuccess: (res: any) => {
        const user = resSanatize(res);
        setUser(user);
        setAuthData({ role: user.role });
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
  } = useMutation("/auth/reset-password", { method: "put" });

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

// googleAuth
export const useGoogleAuth = () => {
  const { mutate: googleAuth, isPending: googleAuthPending } =
    useMutation("/auth/googlse");
  return {
    googleAuth,
    isPending: googleAuthPending,
  };
};
