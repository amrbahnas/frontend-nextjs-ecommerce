"use client";

import { Form, Input, Button, Avatar, Upload } from "antd";
import { FiUser, FiMail, FiPhone, FiCamera } from "react-icons/fi";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "../_api/mutation";
import { useMe } from "@/_api/query";
import toast from "react-hot-toast";
import UploadAvatar from "@/components/ui/uploadAvatar";
import Link from "next/link";
import { Error } from "@/components/ui/error";
const { Item } = Form;

const MainInfoForm = ({
  user,
  refetch,
  isLoading,
  error,
}: {
  user: User;
  refetch: () => void;
  isLoading: boolean;
  error: any;
}) => {
  const { setUser } = useUserStore();
  const [form] = Form.useForm();
  const { updateProfile, updateProfileIsPending, updateProfileError } =
    useUpdateProfile();
  const [image, setImage] = useState<{
    data_url: string;
    file: File | undefined;
  }>({ data_url: "", file: undefined });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setUser(user);
      form.setFieldsValue(user);
      setImage({ data_url: user.profileImg, file: undefined });
    }
  }, [user]);

  const updateUserHandler = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    // formData.append("email", values.email); // email has separate endpoint
    formData.append("phone", values.phone || "");
    formData.append("profileImg", image?.file || image?.data_url || "");

    updateProfile(formData, {
      onSuccess: (result) => {
        refetch();
        toast.success("Profile Updated Successfully");
        setIsFormChanged(false);
      },
    });
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
    const isChanged = Object.keys(allValues).some((key) => {
      return (
        allValues[key as keyof typeof allValues] !==
        user[key as keyof typeof user]
      );
    });
    setIsFormChanged(isChanged);
  };

  const handleImageChange = (newImage: {
    data_url: string;
    file: File | undefined;
  }) => {
    setImage(newImage);
    setIsFormChanged(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <UploadAvatar image={image} setImage={handleImageChange} />
        </div>
        <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={updateUserHandler}
        onValuesChange={handleFormChange}
        validateTrigger="onBlur"
      >
        <Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            prefix={<FiUser className="text-gray-400" />}
            placeholder="Enter your full name"
            size="large"
          />
        </Item>

        <Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          className="!mb-1"
        >
          <Input
            prefix={<FiMail className="text-gray-400" />}
            placeholder="Enter your email"
            size="large"
            disabled
          />
        </Item>
        <Link
          href={"/profile/change-Email"}
          className="text-xs block pl-1 !mb-4"
        >
          Change Email
        </Link>

        <Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            prefix={<FiPhone className="text-gray-400" />}
            placeholder="Enter your phone number"
            size="large"
          />
        </Item>
        <Error error={updateProfileError || error} />
        <Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isFormChanged || updateProfileIsPending || isLoading}
            loading={updateProfileIsPending || isLoading}
            size="large"
            className="w-full"
          >
            Update Profile
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default MainInfoForm;
