"use client";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import styles from "./AddUpdateProduct.module.css";
import CategorySelector from "./categorySelector";
import SubCategorySelector from "./subCategorySelector copy";
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ id }: { id?: string }) => {
  const [form] = Form.useForm();
  const selectedCategory = Form.useWatch("category", form);
  const onFinish = (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
  };
  return (
    <div className="flex flex-wrap items-start justify-center gap-2 mt-4">
      <Form
        layout="vertical"
        form={form}
        className={`${styles.wrapper}`}
        onFinish={onFinish}
      >
        <div className={`${styles.row}`}>
          <CustomFormItem
            name="title"
            label="Title"
            className={`${styles.label}`}
          >
            <Input className="!bg-transparent" />
          </CustomFormItem>

          <CustomFormItem
            name="description"
            label="Description"
            className={`${styles.label}`}
          >
            <TextArea className="!bg-transparent" />
          </CustomFormItem>
        </div>

        <div className={`${styles.row} ${styles.price}`}>
          <CustomFormItem
            name="price"
            label="Price"
            className={`${styles.label}`}
          >
            <InputNumber className="!bg-transparent" />
          </CustomFormItem>
        </div>
        <div className={`${styles.row}`}>
          <div className={styles.col}>
            <CustomFormItem
              name="category"
              label="Category"
              className={`${styles.label}`}
            >
              <CategorySelector />
            </CustomFormItem>
          </div>
          <div className={`${styles.col}`}>
            <CustomFormItem
              name="subCategories"
              label="Sub Category"
              className={`${styles.label}`}
            >
              <SubCategorySelector categoryId={selectedCategory as string} />
            </CustomFormItem>
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.col}`}>
            <CustomFormItem
              name="status"
              label="status"
              className={`${styles.label}`}
            >
              <Select className="!bg-transparent">
                <Option value="trending">trending</Option>
                <Option value="featured">featured</Option>
                <Option value="popular">popular</Option>
                <Option value="normal">normal</Option>
              </Select>
            </CustomFormItem>
          </div>
          <div className={`${styles.col}`}>
            <CustomFormItem
              name="isNew"
              label="isNew"
              className={`${styles.label}`}
            >
              <Switch checkedChildren="New" />
            </CustomFormItem>
          </div>
        </div>
        <Button className={`${styles.submit}`}>{id ? "Update" : "Add"}</Button>
      </Form>
    </div>
  );
};

export default ProductForm;

const CustomFormItem = ({
  children,
  name,
  label,
  className,
}: {
  children: React.ReactNode;
  name: string;
  label: string;
  className: string;
}) => {
  return (
    <Item
      name={name}
      label={<span className="text-white">{label}</span>}
      className={`${styles.label}`}
    >
      {children}
    </Item>
  );
};
