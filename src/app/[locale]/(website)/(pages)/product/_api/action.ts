import useMutation from "@/hooks/apiHandler/useMutation";

export const useAddReview = () => {
  const { mutate, error, isError, isPending } = useMutation("/reviews");
  return {
    addReview: mutate,
    error,
    isError,
    isPending,
  };
};

export const useEditReview = (reviewId: string) => {
  const { mutate, error, isError, isPending } = useMutation(
    "/reviews/" + reviewId,
    { method: "patch" }
  );
  return {
    editReview: mutate,
    error,
    isError,
    isPending,
  };
};

// delete

export const useDeleteReview = (reviewId: string) => {
  const { mutate, error, isError, isPending } = useMutation(
    "/reviews/" + reviewId,
    { method: "delete" }
  );
  return {
    deleteReview: mutate,
    error,
    isError,
    isPending,
  };
};
