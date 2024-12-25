import useMutation from "@/hooks/apiHandler/useMutation";

export const usePayMultiOrder = () => {
  const { mutate: payMultiOrder, isPending: payMultiLoading } = useMutation(
    `/orders/bulk/pay`,
    { method: "patch" }
  );

  return { payMultiOrder, payMultiLoading };
};

export const useDeliverMultiOrder = () => {
  const { mutate: deliverMultiOrder, isPending: deliverMultiLoading } =
    useMutation(`/orders/bulk/deliver`, { method: "patch" });

  return { deliverMultiOrder, deliverMultiLoading };
};
