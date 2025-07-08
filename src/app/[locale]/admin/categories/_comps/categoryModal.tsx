import { Form, Modal, Input, Button, Spin } from "antd";
import React, { useEffect } from "react";
import { useAdminCreateCategory, useAdminEditCategory } from "../_api/action";
import ImageUploader from "@/components/ui/uploadImage";
import toast from "react-hot-toast";
import { serialize } from "object-to-formdata";
import { useTranslations } from "next-intl";

const { Item } = Form;

const CategoryModal = ({
  refetch,
  visible,
  category,
  setVisible,
  setCategory,
}: {
  refetch: () => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  category: any;
  setCategory: any;
}) => {
  const t = useTranslations("admin.categories.modal");
  const [error, setError] = React.useState("");
  const [image, setImage] = React.useState<any[]>([]);
  const [form] = Form.useForm();
  const { createCategory, createLoading } = useAdminCreateCategory();
  const { editCategory, editLoading } = useAdminEditCategory(category?.id);

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
      setImage(
        category.image
          ? [
              {
                data_url: category.image,
                file: null,
              },
            ]
          : []
      );
    }
  }, [category]);

  const onclose = () => {
    setVisible(false);
    setCategory(null);
    setImage([]);
    setError("");
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (!image[0]) {
      toast.error(t("form.image.error"));
      return;
    }
    values.image = image[0]?.file || image[0]?.data_url;

    const formData = serialize(values, {
      allowEmptyArrays: true,
    });
    if (category) {
      editCategory(formData, {
        onSuccess: () => {
          refetch();
          onclose();
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    } else {
      createCategory(formData, {
        onSuccess: () => {
          refetch();
          onclose();
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    }
  };

  return (
    <Modal
      open={visible}
      title={category ? t("edit.title") : t("create.title")}
      okText={category ? t("edit.button") : t("create.button")}
      okButtonProps={{
        loading: createLoading || editLoading,
        disabled: createLoading || editLoading,
      }}
      onCancel={onclose}
      onOk={() => form.submit()}
    >
      <Spin
        spinning={createLoading || editLoading}
        tip={createLoading ? t("create.loading") : t("edit.loading")}
      >
        <div className="text-red-500">{error}</div>
        <Form
          validateTrigger="onSubmit"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Item
            label={t("form.name.label")}
            name="name"
            rules={[{ required: true, message: t("form.name.required") }]}
          >
            <Input placeholder={t("form.name.placeholder")} />
          </Item>
          <Item label={t("form.image.label")}>
            <div className="flex justify-center">
              <ImageUploader images={image} setImages={setImage} />
            </div>
          </Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CategoryModal;
