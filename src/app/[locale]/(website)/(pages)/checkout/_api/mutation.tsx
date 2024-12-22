import useMutation from "@/hooks/apiHandler/useMutation";
import useCardStore from "@/store/useCardStore";

export const useCheckout = () => {
  const cartId = useCardStore((state) => state.onlineCart).id;
  const { mutate: cardCheckout, isPending: checkoutLoading } = useMutation(
    `/payments/credit-order/${cartId}`
  );

  const { mutate: cashCheckout, isPending: cashCheckoutLoading } = useMutation(
    `/payments/cash-order/${cartId}`
  );

  return {
    cardCheckout,
    checkoutLoading,
    cashCheckout,
    cashCheckoutLoading,
  };
};
