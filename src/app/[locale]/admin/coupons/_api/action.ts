import useMutation from "@/hooks/apiHandler/useMutation";
import axios from "axios";

export const useAdminCreateCoupon = () => {
  const { mutate: createCoupon, isPending: createLoading } =
    useMutation("/coupons");

  return { createCoupon, createLoading };
};

export const useAdminEditCoupon = (id?: string) => {
  const { mutate: editCoupon, isPending: editLoading } = useMutation(
    `/coupons/${id}`,
    { method: "patch" }
  );

  return { editCoupon, editLoading };
};

export const useAdminDeleteCoupon = (id?: string) => {
  const { mutate: deleteCoupon, isPending: deleteLoading } = useMutation(
    `/coupons/${id}`,
    { method: "delete" }
  );

  return { deleteCoupon, deleteLoading };
};
