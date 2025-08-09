import { SmartLink } from "@/components/ui/smartLink";
import useAuthStore from "@/store/useAuthStore";
import { MdDashboard } from "react-icons/md";

const AdminDashboard = () => {
  const { isAdmin } = useAuthStore();
  if (!isAdmin) return null;
  return (
    <SmartLink
      prefetchOnHover
      href={"/admin"}
      className="flex items-center gap-1 "
    >
      <MdDashboard />
      admin
    </SmartLink>
  );
};

export default AdminDashboard;
