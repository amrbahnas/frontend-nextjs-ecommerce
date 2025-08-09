import { SmartLink } from "@/components/ui/smartLink";
import useAuthStore from "@/store/useAuthStore";
import { useTranslations } from "next-intl";
import { MdDashboard } from "react-icons/md";

const AdminDashboard = () => {
  const { isAdmin } = useAuthStore();
  const t = useTranslations("Common");
  if (!isAdmin) return null;
  return (
    <SmartLink
      prefetchOnHover
      href={"/admin"}
      className="flex items-center gap-1 "
    >
      <MdDashboard size={20} />
      <span className="hidden sm:block">{t("adminPanel")}</span>
    </SmartLink>
  );
};

export default AdminDashboard;
