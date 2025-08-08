"use client";

import Container from "@/components/ui/container";
import { Avatar, Card, Button, Spin } from "antd";
import MainInfoForm from "./_comps/mainInfoForm";
import { useGetAllOrders } from "../orders/_api/query";
import Link from "next/link";
import dayjs from "dayjs";
import { FiPackage, FiMapPin, FiChevronRight } from "react-icons/fi";
import Addresses from "./_comps/addresses";
import { useMe } from "@/_api/query";
import ProfileSkeleton from "./_comps/profile.skeleton";
import LastThreeOrders from "./_comps/lastThreeOrders";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const { user, isLoading: userLoading, error, refetch } = useMe();
  const t = useTranslations("Profile");

  const { orders, isLoading: ordersLoading } = useGetAllOrders();
  const lastThreeOrders = orders.slice(0, 3);

  if (userLoading || ordersLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container>
      <div className="my-6">
        <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info Section */}
        <Card className="lg:col-span-2 shadow-sm">
          <MainInfoForm
            user={user}
            refetch={refetch}
            isLoading={userLoading}
            error={error}
          />
        </Card>

        {/* Recent Orders Section */}
        <div className="space-y-6">
          <Spin spinning={ordersLoading}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span>{t("sections.recentOrders")}</span>
                  <Link href="/orders">
                    <Button
                      type="link"
                      className="flex items-center gap-1 -me-4"
                    >
                      {t("sections.viewAll")}{" "}
                      <FiChevronRight className="rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              }
              className="shadow-sm"
            >
              <LastThreeOrders lastThreeOrders={lastThreeOrders} />
            </Card>
          </Spin>

          {/* Addresses Section */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gray-500" />
                <span>{t("sections.deliveryAddresses")}</span>
              </div>
            }
            className="shadow-sm"
          >
            <Addresses />
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
