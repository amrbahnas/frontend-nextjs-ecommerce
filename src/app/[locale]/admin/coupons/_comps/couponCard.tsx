"use client";
import { Button, Card, Popconfirm, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaCopy,
  FaGift,
  FaPercent,
  FaRegClock,
  FaTrash,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useAdminDeleteCoupon } from "../_api/action";
import { useTranslations } from "next-intl";

const CouponCard = ({
  coupon,
  setCoupon,
  setVisible,
  refetch,
  setDeleteCouponLoading,
}: {
  coupon: CouponType;
  setCoupon: any;
  setVisible: any;
  refetch: any;
  setDeleteCouponLoading: any;
}) => {
  const t = useTranslations("admin.coupons.card");
  const { deleteCoupon } = useAdminDeleteCoupon(coupon.id);
  const isExpired = dayjs(coupon.expireAt).isBefore(dayjs());

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success(t("copy.success"));
  };

  const handleDelete = async () => {
    try {
      setDeleteCouponLoading(true);
      await deleteCoupon(
        {},
        {
          onSuccess: () => {
            toast.success(t("delete.success"));
            refetch();
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setDeleteCouponLoading(false);
    }
  };

  return (
    <Card
      className={`relative overflow-hidden ${
        isExpired ? "bg-gray-50" : "bg-gradient-to-br from-blue-50 to-white"
      }`}
      actions={[
        <Tooltip title={t("copy.tooltip")} key="copy">
          <Button
            type="text"
            icon={<FaCopy />}
            onClick={handleCopyCode}
            className="text-blue-500 hover:text-blue-600"
          />
        </Tooltip>,
        <Tooltip title={t("edit.tooltip")} key="edit">
          <Button
            type="text"
            icon={<MdEdit />}
            onClick={() => {
              setCoupon(coupon);
              setVisible(true);
            }}
            className="text-green-500 hover:text-green-600"
          />
        </Tooltip>,
        <Tooltip title={t("delete.tooltip")} key="delete">
          <Popconfirm
            title={t("delete.title")}
            description={t("delete.description")}
            onConfirm={handleDelete}
            okText={t("delete.confirm")}
            cancelText={t("delete.cancel")}
            placement="bottom"
          >
            <Button
              type="text"
              danger
              icon={<FaTrash />}
              className="hover:text-red-600"
            />
          </Popconfirm>
        </Tooltip>,
      ]}
    >
      {isExpired && (
        <div className="absolute -right-12 top-6 bg-red-500 text-white px-16 py-1 rotate-45">
          {t("status.expired")}
        </div>
      )}

      <div className="flex flex-col gap-4 p-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <FaGift className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">{coupon.code}</h3>
              <p className="text-gray-500 text-sm">
                {isExpired ? t("status.expired") : t("status.active")}
              </p>
            </div>
          </div>
          <Tag color="blue" className="text-lg px-3 py-1">
            <span className="flex items-center gap-1">
              <FaPercent className="text-sm" />
              {coupon.discount}
            </span>
          </Tag>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <FaCalendarAlt />
          <span className="text-sm">
            {t("dates.expires")}: {dayjs(coupon.expireAt).format("DD MMM YYYY")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <FaRegClock />
          <span className="text-sm">
            {t("dates.created")}:{" "}
            {dayjs(coupon.createdAt).format("DD MMM YYYY")}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
