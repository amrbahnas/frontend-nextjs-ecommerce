import useMutation from "@/hooks/apiHandler/useMutation";

export const useSendVerificationEmailCode = () => {
  const {
    mutate: sendVerificationEmailCode,
    isPending: sendVerificationEmailCodeLoading,
    error,
  } = useMutation("/auth/request-verify-email-code");
  return {
    sendVerificationEmailCode,
    sendVerificationEmailCodeLoading,
    sendVerificationEmailCodeError: error,
  };
};

export const useVerifyEmail = () => {
  const {
    mutate: verifyEmail,
    isPending: verifyEmailLoading,
    error,
  } = useMutation("/auth/verify-email", {
    useProxy: true,
  });
  return {
    verifyEmail,
    verifyEmailLoading,
    verifyEmailError: error,
  };
};
