import React, { useEffect, useState } from "react";
import { useUpdateUser } from "../_api/mutation";
import { Button, Form, Input, Spin } from "antd";

import UploadAvatar from "@/components/ui/uploadAvatar";
import Item from "@/components/antd/item";
import { Error } from "@/components/ui/error";
import useUserStore from "@/store/useUserStore";
import { toast } from "react-toastify";
import { useMe } from "@/_api/query";

const MainInfoForm = () => {
  const [image, setImage] = useState<{
    data_url: string;
    file: File | undefined;
  }>({ data_url: "", file: undefined });

  const { user, isLoading, error, refetch } = useMe();
  const setUser = useUserStore((state) => state.setUser);
  const [form] = Form.useForm();
  const { updateUser, updateUserIsPending, updateUserError } = useUpdateUser();

  useEffect(() => {
    if (user?._id) {
      setUser(user);
      form.setFieldsValue(user);
      setImage({ data_url: user.profileImg, file: undefined });
    }
  }, [user]);

  const updateUserHandler = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone || "");
    formData.append("profileImg", image?.file || image?.data_url || "");

    updateUser(formData, {
      onSuccess: (result) => {
        refetch();
        toast("Profile Updated Successfully");
      },
    });
  };

  return (
    <Spin spinning={updateUserIsPending || isLoading}>
      <div className="flex  items-center justify-center">
        <UploadAvatar image={image} setImage={setImage} />
      </div>
      <Form
        validateTrigger="onBlur"
        onFinish={updateUserHandler}
        form={form}
        layout="vertical"
        className="mt-12 flex flex-col gap-4"
      >
        <Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input placeholder="Enter your Name" className=" rounded-md p-4" />
        </Item>
        <Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              validator(_, value) {
                if (value && value.endsWith("@gmail.com")) {
                  return Promise.resolve();
                }
                return Promise.reject("The email must be a Gmail address!");
              },
            },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className=" rounded-md p-4"
          />
        </Item>
        <Item label="Phone" name="phone">
          <Input placeholder="Enter your phone" className=" rounded-md p-4" />
        </Item>
        <Button
          disabled={updateUserIsPending || isLoading}
          loading={updateUserIsPending || isLoading}
          htmlType="submit"
          type="primary"
          size="large"
          className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed "
        >
          {updateUserIsPending ? "Updating..." : "Update"}
        </Button>
        <Error error={updateUserError || error} />
      </Form>
    </Spin>
  );
};

export default MainInfoForm;
