import { Form, Input, Modal, Spin } from "antd";
import React, { useEffect } from "react";
import {
  useAdminCreateSubCategory,
  useAdminEditSubCategory,
} from "../_api/action";
import CategoriesSelector from "@/components/selectors/categoriesSelector";
import useParamsService from "@/hooks/global/useParamsService";
const { Item } = Form;
const SubCategoryModal = ({
  refetch,
  visible,
  subCategory,
  setVisible,
  setSubCategory,
}: {
  refetch: () => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  subCategory: SubCategoryType | null;
  setSubCategory: any;
}) => {
  const [error, setError] = React.useState("");
  const { getParams } = useParamsService("okay I will");
  const categoryId = getParams("category");

  const [form] = Form.useForm();
  const { createSubCategory, createLoading } = useAdminCreateSubCategory();
  const { editSubCategory, editLoading } = useAdminEditSubCategory(
    subCategory?.id
  );

  useEffect(() => {
    if (subCategory) {
      form.setFieldsValue(subCategory);
    }
  }, [subCategory]);

  useEffect(() => {
    if (categoryId) {
      form.setFieldValue("categoryId", categoryId);
    }
  }, [categoryId]);

  const onclose = () => {
    setVisible(false);
    setSubCategory(null);
    setError("");
    form.resetFields();
  };

  const onFinish = (values: any) => {
    if (subCategory) {
      editSubCategory(values, {
        onSuccess: () => {
          refetch();
          onclose();
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    } else {
      createSubCategory(values, {
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
      destroyOnHidden
      title={subCategory ? "Edit Sub Category" : "Create Sub Category"}
      okText={subCategory ? "Update" : "Create"}
      okButtonProps={{
        loading: createLoading || editLoading,
        disabled: createLoading || editLoading,
      }}
      onCancel={onclose}
      onOk={() => form.submit()}
    >
      <Spin
        spinning={createLoading || editLoading}
        tip={createLoading ? "Creating..." : "Updating..."}
      >
        <div className="text-red-500">{error}</div>
        <Form
          validateTrigger="onSubmit"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <CategoriesSelector />
          </Item>
          <Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default SubCategoryModal;
