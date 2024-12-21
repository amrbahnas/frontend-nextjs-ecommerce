"use client";

import { Form, Modal, Input, Button, DatePicker, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useAdminCreateCoupon, useAdminEditCoupon } from "../_api/action";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Error } from "@/components/ui/error";

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
  const [error, setError] = React.useState("");
  const [form] = Form.useForm();
  const { createCoupon, createLoading } = useAdminCreateCoupon();
  const { editCoupon, editLoading } = useAdminEditCoupon(coupon?.id);

  useEffect(() => {
    if (coupon) {
      form.setFieldsValue({
        ...coupon,
        expiredAt: dayjs(coupon.expiredAt),
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
    const formData = {
      ...values,
      discount: Number(values.discount),
    };

    if (coupon) {
      editCoupon(formData, {
        onSuccess: () => {
          toast.success("Coupon Updated");
          onClose();
          refetch();
        },
        onError: (error) => {
          setError(error.message);
          toast.error(error.message);
        },
      });
    } else {
      createCoupon(formData, {
        onSuccess: () => {
          toast.success("Coupon Created");
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
      title={coupon ? "Edit Coupon" : "Create Coupon"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Item
          label="Code"
          name="code"
          rules={[{ required: true, message: "Please input coupon code!" }]}
        >
          <Input placeholder="Enter coupon code" size="large" />
        </Item>

        <Item
          label="Discount (%)"
          name="discount"
          rules={[{ required: true, message: "Please input discount!" }]}
        >
          <InputNumber
            type="number"
            min={1}
            max={100}
            placeholder="Enter discount percentage"
            size="large"
            className="!w-full"
          />
        </Item>

        <Item
          label="Expiry Date"
          name="expiredAt"
          rules={[{ required: true, message: "Please select expiry date!" }]}
        >
          <DatePicker type="date" size="large" className="w-full" />
        </Item>

        <Error error={error} />

        <div className="flex justify-end gap-2">
          <Button size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={createLoading || editLoading}
          >
            {coupon ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CouponModal;
