"use client";
import { Button, Form, Input, Modal, Spin, message } from "antd";
import { useCreateAddress, useUpdateAddress } from "../../_api/mutation";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

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
  // const addressId = initialData?.id;
  const [addressId, setAddressId] = useState<string | null | undefined>(
    initialData?.id
  );
  const [form] = Form.useForm();
  const { createAddress, createAddressIsPending } = useCreateAddress();
  const { updateAddress, updateAddressIsPending } = useUpdateAddress(addressId);

  const onFinish = async (values: AddressType) => {
    if (addressId) {
      updateAddress(values, {
        onSuccess: () => {
          addressesRefetch && addressesRefetch();
          form.resetFields();
          onClose();
        },
      });
    } else {
      createAddress(values, {
        onSuccess: () => {
          addressesRefetch && addressesRefetch();
          form.resetFields();
          onClose();
        },
      });
    }
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setAddressId(initialData.id);
    } else {
      form.resetFields();
      setAddressId(null);
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
          {/* <Button
            onClick={() => {}}
            style={{ marginBottom: 16 }}
            loading={false}
            icon={<AimOutlined />}
          >
            Get Current Location
          </Button> */}
          <Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Input placeholder="Enter your country" />
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
          <Item label="Zip Code" name="zipCode">
            <Input placeholder="Enter your Zip code" />
          </Item>
          <Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone" }]}
          >
            <Input placeholder="Enter your phone" />
          </Item>
          <Item label="More Address Details" name="address">
            <TextArea placeholder="More Address Details" rows={4} />
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
