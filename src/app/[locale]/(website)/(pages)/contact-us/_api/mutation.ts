import useMutation from "@/hooks/apiHandler/useMutation";

export const useContactUs = () => {
  const { mutate, data, error, isError, isPending } =
    useMutation("/users/contact-us");
  return { sendContactUs: mutate, data, error, isError, isPending };
};
