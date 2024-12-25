import useMutation from "@/hooks/apiHandler/useMutation";

export const usePaySingleOrder = (id: string) => {
  const { mutate: paySingleOrder, isPending: paySingleLoading } = useMutation(
    `/orders/${id}/pay`,
    { method: "patch" }
  );

  return { paySingleOrder, paySingleLoading };
};

export const useDeliverSingleOrder = (id: string) => {
  const { mutate: deliverSingleOrder, isPending: deliverSingleLoading } =
    useMutation(`/orders/${id}/deliver`, { method: "patch" });

  return { deliverSingleOrder, deliverSingleLoading };
};
