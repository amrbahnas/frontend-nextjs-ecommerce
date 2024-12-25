"use client";
import React from "react";
import {
  Button,
  Card,
  Divider,
  Empty,
  Pagination,
  Popconfirm,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import AdminPageTile from "../_comps/adminPageTile";
import { useAdminDeleteCoupon } from "./_api/action";
import CouponModal from "./_comps/couponModal";
import { useGetAdminCoupons } from "./_api/query";
import dayjs from "dayjs";
import {
  FaCalendarAlt,
  FaCopy,
  FaGift,
  FaPercent,
  FaRegClock,
  FaTrash,
} from "react-icons/fa";

const Page = () => {
  const { coupons, isLoading, refetch, pagination } = useGetAdminCoupons();
  const [visible, setVisible] = React.useState(false);
  const [coupon, setCoupon] = React.useState<CouponType | null>(null);
  const [deleteCouponLoading, setDeleteCouponLoading] = React.useState(false);

  return (
    <div className="">
      <AdminPageTile>Coupons</AdminPageTile>
      <div className="flex justify-end my-6">
        <Button
          type="primary"
          icon={<IoIosAddCircleOutline />}
          onClick={() => setVisible(true)}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">Add New Coupon</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <Spin
        spinning={isLoading || deleteCouponLoading}
        tip="Loading..."
        size="large"
      >
        {coupons?.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No coupons found"
            className="my-8"
          >
            <Button type="primary" onClick={() => setVisible(true)}>
              Create New Coupon
            </Button>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons?.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                setCoupon={setCoupon}
                setVisible={setVisible}
                refetch={refetch}
                setDeleteCouponLoading={setDeleteCouponLoading}
              />
            ))}
          </div>
        )}
      </Spin>

      {coupons?.length > 0 && (
        <div className="flex justify-center  mt-40">
          <Pagination {...pagination} />
        </div>
      )}

      <CouponModal
        coupon={coupon}
        refetch={refetch}
        visible={visible}
        setVisible={setVisible}
        setCoupon={setCoupon}
      />
    </div>
  );
};

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
            placement="topRight"
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

export default Page;
