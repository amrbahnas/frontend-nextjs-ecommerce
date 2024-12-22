"use client";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useCreateAddress, useUpdateAddress } from "../../_api/mutation";
import { useEffect } from "react";
const { Item } = Form;

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: AddressType | null;
  addressesRefetch?: () => void;
}

const AddressModal = ({
  open,
  onClose,
  initialData,
  addressesRefetch,
}: AddressModalProps) => {
  const addressId = initialData?.id;
  const [form] = Form.useForm();
  const { createAddress, createAddressIsPending } = useCreateAddress();
  const { updateAddress, updateAddressIsPending } = useUpdateAddress(addressId);

  const onFinish = async (values: AddressType) => {
    if (addressId) {
      updateAddress(values, {
        onSuccess: addressesRefetch,
      });
    } else {
      createAddress(values, {
        onSuccess: addressesRefetch,
      });
    }
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const isLoading = createAddressIsPending || updateAddressIsPending;

  return (
    <Modal
      title={initialData ? "Edit Address" : "Add New Address"}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address" />
          </Item>

          <Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input placeholder="Enter your city" />
          </Item>

          <Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please enter your state" }]}
          >
            <Input placeholder="Enter your state" />
          </Item>

          <Item
            label="Postal Code"
            name="postalCode"
            rules={[
              { required: true, message: "Please enter your postal code" },
            ]}
          >
            <Input placeholder="Enter your postal code" />
          </Item>

          <Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Input placeholder="Enter your country" />
          </Item>

          <Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone" }]}
          >
            <Input placeholder="Enter your phone" />
          </Item>

          <Item className="mb-0">
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {initialData ? "Update" : "Add"} Address
            </Button>
          </Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddressModal;
