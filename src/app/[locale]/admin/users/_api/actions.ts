import useMutation from "@/hooks/apiHandler/useMutation";

export const useAdminEditUser = (id: string | undefined) => {
  const { mutate: changeUserRole, isPending: changeUserRoleLoading } =
    useMutation("/users/" + id + "/change-role", { method: "patch" });
  const { mutate: toggleActive, isPending: toggleActiveLoading } = useMutation(
    "/users/" + id + "/toggle-active",
    { method: "patch" }
  );
  return {
    changeUserRole,
    changeUserRoleLoading,
    toggleActive,
    toggleActiveLoading,
  };
};
