"use client";
import React from "react";
import { Button, Divider, Pagination, Popconfirm, Spin } from "antd";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import AdminPageTile from "../_comps/adminPageTile";

import { useAdminDeleteCoupon } from "./_api/action";
import CouponModal from "./_comps/couponModal";
import { useGetAdminCoupons } from "./_api/query";
import dayjs from "dayjs";

const Page = () => {
  const { coupons, isLoading, refetch, pagination } = useGetAdminCoupons();
  const [visible, setVisible] = React.useState(false);
  const [coupon, setCoupon] = React.useState<CouponType | null>(null);
  const [deleteCouponLoading, setDeleteCouponLoading] = React.useState(false);

  return (
    <div className="flex flex-col gap-10 h-full">
      <AdminPageTile>Coupons</AdminPageTile>

      <Spin
        spinning={isLoading || deleteCouponLoading}
        tip="Loading..."
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <AddCouponCard setVisible={setVisible} />
        </div>
      </Spin>
      <Pagination {...pagination} />
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
  const { deleteCoupon, deleteLoading } = useAdminDeleteCoupon(coupon?.id);

  const updateCoupon = () => {
    setCoupon(coupon);
    setVisible(true);
  };

  const removeCoupon = () => {
    setDeleteCouponLoading(true);
    deleteCoupon(
      {},
      {
        onSuccess: () => {
          toast.success("Coupon Deleted");
          setDeleteCouponLoading(false);
          refetch();
        },
        onError: (error) => {
          toast.error(error.message);
          setDeleteCouponLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col bg-gray-100 hover:shadow-lg translate transition-all rounded-md overflow-hidden p-4">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">{coupon.code}</div>
        <div className="text-sm text-gray-600">
          Discount: {coupon.discount}%
        </div>
        <div className="text-sm text-gray-600">
          Expires: {dayjs(coupon.expiredAt).format("YYYY-MM-DD")}
        </div>
      </div>
      <Divider />
      <div className="flex justify-end gap-2">
        <Button
          onClick={updateCoupon}
          icon={<MdEdit className="text-lg" />}
          type="text"
        />
        <Popconfirm
          title="Delete Coupon"
          description="Are you sure to delete this coupon?"
          onConfirm={removeCoupon}
          okText="Yes"
          cancelText="No"
        >
          <Button
            loading={deleteLoading}
            icon={<TiDeleteOutline className="text-lg" />}
            type="text"
            danger
          />
        </Popconfirm>
      </div>
    </div>
  );
};

const AddCouponCard = ({
  setVisible,
}: {
  setVisible: (value: boolean) => void;
}) => {
  return (
    <div
      onClick={() => setVisible(true)}
      className="flex flex-col items-center justify-center bg-gray-100 hover:shadow-lg translate transition-all rounded-md overflow-hidden p-4 cursor-pointer min-h-[200px]"
    >
      <IoIosAddCircleOutline className="text-4xl" />
      <span>Add New Coupon</span>
    </div>
  );
};

export default Page;
