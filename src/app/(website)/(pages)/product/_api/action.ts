import useMutation from "@/hooks/useMutation";

export const useAddReview = () => {
  const { mutate, error, isError, isPending } = useMutation("/reviews", "post");
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
    "put"
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
    "delete"
  );
  return {
    deleteReview: mutate,
    error,
    isError,
    isPending,
  };
};
