"use client";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
} from "antd";
import CategorySelector from "./selectors/categorySelector";
import SubCategorySelector from "./selectors/subCategorySelector";
import ImageUploader from "@/components/uploadImage";
import { useEffect, useState } from "react";
import { useAdminCreateProduct, useAdminEditProduct } from "../_api/actions";
import {
  useGetAdminCategories,
  useGetAdminProduct,
  useGetAdminSubCategories,
} from "../_api/query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const { Item } = Form;
const { TextArea } = Input;

const row = "flex items-center gap-5 flex-col md:flex-row ";

const ProductForm = ({ id }: { id?: string }) => {
  const [imageCover, setImageCover] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const router = useRouter();
  const [form] = Form.useForm();
  const selectedCategory = Form.useWatch("category", form);
  const { categories, isLoading } = useGetAdminCategories();
  const { Subcategories, isLoading: subIsLoading } =
    useGetAdminSubCategories(selectedCategory);

  const { createLoading, createProduct } = useAdminCreateProduct();
  const { editLoading, editProduct } = useAdminEditProduct(id);
  const { product, isLoading: productIsLoading } = useGetAdminProduct(id);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({ ...product, category: product.category._id });

      setImageCover([{ data_url: product.imageCover, file: null }]);
      setImages(
        product.images.map((image: string) => ({
          data_url: image,
          file: null,
        }))
      );
    }
  }, [product]);

  const handleImages = (formData: FormData) => {
    const imageCoverFile = imageCover[0].file;
    const uploadCoverImage = imageCoverFile
      ? imageCoverFile
      : imageCover[0].data_url;

    formData.append("imageCover", uploadCoverImage);

    if (images.length > 0) {
      const uploadImages = images.map((image: any) =>
        image.file ? image.file : image.data_url
      );
      // cant send array of files as  JSON.stringify so we append each file, if images.length = 1 it send to formData as single file ,note: backend accept array of files or single file
      uploadImages.forEach((image: any) => {
        formData.append("images", image);
      });
    } else {
      formData.append("images", JSON.stringify([]));
    }
  };

  const onFinish = (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);

    if (!imageCover.length) {
      return toast.error("Please upload a cover image");
    }

    const formData = new FormData();

    handleImages(formData);

    for (const key in values) {
      //JSON.stringify to can send array at formData to backend (colors,subCategories as example)
      if (values[key]) formData.append(key, JSON.stringify(values[key]));
    }

    if (id) {
      editProduct(formData, {
        onSuccess: () => {
          toast.success("Product updated successfully");
          router.push("/product/" + id);
        },
      });
    } else {
      createProduct(formData, {
        onSuccess: () => {
          toast.success("Product created successfully");
          router.push("/admin/products");
        },
      });
    }
  };

  return (
    <div className={" !p-4 w-full md:w-3/4  shadow-lg rounded-md "}>
      <Spin
        spinning={createLoading || editLoading || productIsLoading}
        tip={createLoading ? "Creating..." : "Updating..."}
      >
        <Form
          layout="vertical"
          form={form}
          className="!w-full"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold mb-4">
            {id ? "Update Product" : "Add Product"}
          </h1>
          <Item name="title" label="Title" className={"!w-full"}>
            <Input className="" />
          </Item>
          <Item name="description" label="Description" className={"!w-full"}>
            <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Item>
          <Item label="Image Cover" className={"!w-full"}>
            <ImageUploader
              multiple={false}
              images={imageCover}
              setImages={setImageCover}
            />
          </Item>
          <Item label="More images" className={"!w-full"}>
            <ImageUploader
              multiple={true}
              images={images}
              setImages={setImages}
            />
          </Item>
          <div className={row}>
            <Item name="quantity" label="quantity" className={"!w-full"}>
              <InputNumber min={1} className="!w-full" />
            </Item>
            <Item name="price" label="Price" className={"!w-full"}>
              <InputNumber prefix="$" min={1} className="!w-full" />
            </Item>
          </div>
          <Item name="colors" label="Colors" className={"!w-full"}>
            <Select
              placeholder="Select a category"
              allowClear
              mode="multiple"
              options={["red", "blue", "white"].map((color) => ({
                label: color,
                value: color,
              }))}
            />
          </Item>
          <div className={row}>
            <Item name="category" label="Category" className={"!w-full"}>
              {/* <CategorySelector /> */}
              <Select
                loading={isLoading}
                placeholder="Select a category"
                allowClear
                options={categories.map((category) => ({
                  label: category.name,
                  value: category._id,
                }))}
              />
            </Item>
            <Item
              name="subCategories"
              label="Sub Category"
              className={"!w-full"}
            >
              {/* <SubCategorySelector categoryId={selectedCategory as string} /> */}
              <Select
                loading={subIsLoading}
                placeholder="Select a subCategory"
                mode="multiple"
                allowClear
                options={Subcategories.map((subCategory) => ({
                  label: subCategory.title,
                  value: subCategory._id,
                }))}
              />
            </Item>
          </div>
          <div className={row}>
            <Item name="status" label="status" className={"!w-full"}>
              <Select
                allowClear
                className=""
                options={[
                  { label: "trending", value: "trending" },
                  { label: "featured", value: "featured" },
                  { label: "popular", value: "popular" },
                  { label: "normal", value: "normal" },
                ]}
              />
            </Item>
            <Item name="isNew" label="isNew" className={"!w-full"}>
              <Switch checkedChildren="New" />
            </Item>
          </div>
          <Flex gap={"small"}>
            <Button size="large" type="primary" htmlType="submit">
              {id ? "Update" : "Add"}
            </Button>
            <Button
              size="large"
              danger
              htmlType="reset"
              onClick={() => {
                setImageCover([]);
                setImages([]);
              }}
            >
              Reset
            </Button>
          </Flex>
        </Form>
      </Spin>
    </div>
  );
};

export default ProductForm;
