"use client";
import { Button, Form, Input, Modal, Spin } from "antd";
import { useCreateAddress, useUpdateAddress } from "../../_api/mutation";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Profile.addresses");
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
      title={initialData ? t("edit") : t("addNew")}
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
            label={t("form.country.label")}
            name="country"
            rules={[{ required: true, message: t("form.country.required") }]}
          >
            <Input size="large" placeholder={t("form.country.placeholder")} />
          </Item>
          <Item
            label={t("form.city.label")}
            name="city"
            rules={[{ required: true, message: t("form.city.required") }]}
          >
            <Input size="large" placeholder={t("form.city.placeholder")} />
          </Item>
          <Item
            label={t("form.state.label")}
            name="state"
            rules={[{ required: true, message: t("form.state.required") }]}
          >
            <Input size="large" placeholder={t("form.state.placeholder")} />
          </Item>
          <Item
            label={t("form.zipCode.label")}
            name="zipCode"
            rules={[
              {
                required: true,
                message: t("form.zipCode.required"),
              },
              {
                min: 4,
              },
            ]}
          >
            <Input size="large" placeholder={t("form.zipCode.placeholder")} />
          </Item>
          <Item
            label={t("form.phone.label")}
            name="phone"
            rules={[
              { required: true, message: t("form.phone.required") },
              {
                min: 8,
                message: t("form.phone.invalid"),
              },
            ]}
          >
            <Input size="large" placeholder={t("form.phone.placeholder")} />
          </Item>
          <Item label={t("form.details.label")} name="address">
            <TextArea
              size="large"
              placeholder={t("form.details.placeholder")}
              rows={4}
            />
          </Item>

          <Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
            >
              {initialData ? t("form.submit.update") : t("form.submit.add")}
            </Button>
          </Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddressModal;
