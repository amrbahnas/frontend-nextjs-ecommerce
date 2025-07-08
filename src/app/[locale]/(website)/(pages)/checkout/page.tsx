"use client";
import Container from "@/components/ui/container";
import { Steps, Button, Spin } from "antd";
import { useState } from "react";
import CartSummary from "./_comps/cartSummary";
import AddressSelection from "./_comps/addressSelection";
import PaymentMethod from "./_comps/paymentMethod";
import { useCheckout } from "./_api/mutation";
import useParamsService from "@/hooks/global/useParamsService";
import resSanatize from "@/services/sanatizeApiRes";
import useCardStore from "@/store/useCardStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CheckoutPage = () => {
  const t = useTranslations("checkout");
  const [current, setCurrent] = useState(0);
  const { resetCart } = useCardStore();
  const router = useRouter();
  const { getParams } = useParamsService("okay I will");
  const { cardCheckout, cashCheckout, cashCheckoutLoading, checkoutLoading } =
    useCheckout();

  const steps = [
    {
      title: t("steps.cartSummary"),
      content: <CartSummary />,
    },
    {
      title: t("steps.deliveryAddress"),
      content: <AddressSelection />,
    },
    {
      title: t("steps.paymentMethod"),
      content: <PaymentMethod />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onFinish = () => {
    const paymentMethod = getParams("paymentMethod") || "credit";
    const addressId = getParams("address");
    if (paymentMethod === "cash") {
      cashCheckout(
        { addressId },
        {
          onSuccess: (res) => {
            resetCart();
            const orderId = resSanatize(res)?.orderId;
            toast.success(t("success.orderPlaced"));
            router.push("/orders/" + orderId);
          },
        }
      );
    } else {
      cardCheckout(
        { addressId },
        {
          onSuccess: (res) => {
            window.location.href = resSanatize(res);
          },
        }
      );
    }
  };

  return (
    <Container>
      <div className="py-8">
        <Steps current={current} items={items} className="!mb-8" />
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <Spin spinning={cashCheckoutLoading || checkoutLoading}>
            {steps[current].content}
          </Spin>
        </div>
        <div className="flex justify-end gap-2">
          {current > 0 && (
            <Button onClick={prev}>{t("navigation.previous")}</Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              {t("navigation.next")}
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              loading={cashCheckoutLoading || checkoutLoading}
              type="primary"
              onClick={onFinish}
            >
              {t("navigation.placeOrder")}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
