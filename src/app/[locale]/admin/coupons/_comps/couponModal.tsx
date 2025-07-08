"use client";

import { Form, Modal, Input, Button, DatePicker, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useAdminCreateCoupon, useAdminEditCoupon } from "../_api/action";
import toast from "react-hot-toast";
import { Error } from "@/components/ui/error";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";

const { Item } = Form;

const CouponModal = ({
  refetch,
  visible,
  coupon,
  setVisible,
  setCoupon,
}: {
  refetch: () => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  coupon: CouponType | null;
  setCoupon: any;
}) => {
  const t = useTranslations("admin.coupons.modal");
  const [error, setError] = React.useState("");
  const [form] = Form.useForm();
  const { createCoupon, createLoading } = useAdminCreateCoupon();
  const { editCoupon, editLoading } = useAdminEditCoupon(coupon?.id);

  useEffect(() => {
    if (coupon) {
      form.setFieldsValue({
        ...coupon,
        expireAt: dayjs(coupon.expireAt),
      });
    }
  }, [coupon]);

  const onClose = () => {
    setVisible(false);
    setCoupon(null);
    setError("");
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (coupon) {
      editCoupon(values, {
        onSuccess: () => {
          toast.success(t("edit.success"));
          onClose();
          refetch();
        },
        onError: (error) => {
          setError(error.message);
          toast.error(error.message);
        },
      });
    } else {
      createCoupon(values, {
        onSuccess: () => {
          toast.success(t("create.success"));
          onClose();
          refetch();
        },
        onError: (error) => {
          setError(error.message);
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <Modal
      title={coupon ? t("edit.title") : t("create.title")}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Item
          label={t("form.code.label")}
          name="code"
          rules={[{ required: true, message: t("form.code.required") }]}
        >
          <Input placeholder={t("form.code.placeholder")} size="large" />
        </Item>

        <Item
          label={t("form.discount.label")}
          name="discount"
          rules={[{ required: true, message: t("form.discount.required") }]}
        >
          <InputNumber
            type="number"
            min={1}
            max={100}
            placeholder={t("form.discount.placeholder")}
            size="large"
            className="!w-full"
          />
        </Item>

        <Item
          label={t("form.expiry.label")}
          name="expireAt"
          rules={[{ required: true, message: t("form.expiry.required") }]}
        >
          <DatePicker size="large" className="w-full" />
        </Item>

        <Error error={error} />

        <div className="flex justify-end gap-2">
          <Button size="large" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={createLoading || editLoading}
          >
            {coupon ? t("edit.button") : t("create.button")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CouponModal;
