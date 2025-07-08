"use client";
import { Button, Empty, Pagination, Spin } from "antd";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AdminPageTile from "../_comps/adminPageTile";
import { useGetAdminCoupons } from "./_api/query";
import CouponCard from "./_comps/couponCard";
import CouponModal from "./_comps/couponModal";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("admin.coupons");
  const { coupons, isLoading, refetch, pagination } = useGetAdminCoupons();
  const [visible, setVisible] = React.useState(false);
  const [coupon, setCoupon] = React.useState<CouponType | null>(null);
  const [deleteCouponLoading, setDeleteCouponLoading] = React.useState(false);

  return (
    <div className="">
      <AdminPageTile>{t("title")}</AdminPageTile>
      <div className="flex justify-end my-6">
        <Button
          type="primary"
          icon={<IoIosAddCircleOutline />}
          onClick={() => setVisible(true)}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">{t("add.button")}</span>
          <span className="sm:hidden">{t("add.button_short")}</span>
        </Button>
      </div>

      <Spin
        spinning={isLoading || deleteCouponLoading}
        tip={t("loading")}
        size="large"
      >
        {coupons?.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("empty.description")}
            className="my-8"
          >
            <Button type="primary" onClick={() => setVisible(true)}>
              {t("empty.button")}
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
        <div className="flex justify-end mt-10">
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

export default Page;
