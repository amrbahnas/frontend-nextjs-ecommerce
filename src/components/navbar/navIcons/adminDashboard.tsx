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
      <MdDashboard size={20} />
      <span className="hidden sm:block">Admin Panel</span>
    </SmartLink>
  );
};

export default AdminDashboard;
