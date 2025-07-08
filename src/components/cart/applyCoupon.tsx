import { useApplyCoupon, useRemoveCoupon } from "@/_api/actions";
import Item from "@/components/antd/item";
import { Error } from "@/components/ui/error";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

const ApplyCoupon = ({
  refetchCart,
  hidden = false,
  appliedCoupon,
}: {
  refetchCart: any;
  hidden?: boolean;
  appliedCoupon?: CouponType | null;
}) => {
  const t = useTranslations("Cart.coupon");
  const { applyCoupon, isPending, error } = useApplyCoupon();
  const { isPending: removeCouponLoading, removeCoupon } = useRemoveCoupon();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    applyCoupon(values, {
      onSuccess: () => {
        refetchCart();
      },
    });
  };

  useEffect(() => {
    if (appliedCoupon) {
      form.setFieldsValue({ code: appliedCoupon.code });
    }
  }, [appliedCoupon]);

  if (hidden) return null;

  return (
    <Form
      validateTrigger="onSubmit"
      disabled={(appliedCoupon ? true : false) || isPending}
      form={form}
      onFinish={onFinish}
    >
      <h3 className="text-md font-semibold text-gray-800 mb-2">{t("title")}</h3>
      <div className="flex gap-2">
        <Item
          name="code"
          className="flex-1"
          rules={[{ required: true, message: t("required") }]}
        >
          <Input
            size="large"
            allowClear
            placeholder={t("placeholder")}
            disabled={appliedCoupon ? true : false}
          />
        </Item>
        <Button loading={isPending} htmlType="submit" size="large">
          {t("apply")}
        </Button>
      </div>
      {appliedCoupon && (
        <Button
          disabled={!appliedCoupon}
          type="link"
          loading={removeCouponLoading}
          className="!p-0"
          onClick={() => {
            removeCoupon(
              {},
              {
                onSuccess: () => {
                  refetchCart();
                  form.resetFields();
                },
              }
            );
          }}
        >
          {t("remove")}
        </Button>
      )}
      <Error error={error} />
    </Form>
  );
};

export default ApplyCoupon;
