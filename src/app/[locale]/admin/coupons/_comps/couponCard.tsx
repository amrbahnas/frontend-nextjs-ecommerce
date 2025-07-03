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
  const { deleteCoupon } = useAdminDeleteCoupon(coupon.id);
  const isExpired = dayjs(coupon.expireAt).isBefore(dayjs());

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success("Coupon code copied to clipboard!");
  };

  const handleDelete = async () => {
    try {
      setDeleteCouponLoading(true);
      await deleteCoupon(
        {},
        {
          onSuccess: () => {
            toast.success("Coupon deleted successfully");
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
        <Tooltip title="Copy Code" key="copy">
          <Button
            type="text"
            icon={<FaCopy />}
            onClick={handleCopyCode}
            className="text-blue-500 hover:text-blue-600"
          />
        </Tooltip>,
        <Tooltip title="Edit Coupon" key="edit">
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
        <Tooltip title="Delete Coupon" key="delete">
          <Popconfirm
            title="Delete Coupon"
            description="Are you sure you want to delete this coupon?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
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
          Expired
        </div>
      )}

      <div className="flex flex-col gap-4 p-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <FaGift className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">{coupon.code}</h3>
              <p className="text-gray-500 text-sm">
                {isExpired ? "Expired" : "Active"} Coupon
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
            Expires: {dayjs(coupon.expireAt).format("DD MMM YYYY")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <FaRegClock />
          <span className="text-sm">
            Created: {dayjs(coupon.createdAt).format("DD MMM YYYY")}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CouponCard;
