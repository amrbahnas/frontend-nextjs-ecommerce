import { Error } from "@/components/ui/error";
import { Button, Form, Rate } from "antd";
import { useForm } from "antd/es/form/Form";
import Item from "@/components/antd/item";
import TextArea from "antd/es/input/TextArea";
import { useAddReview, useEditReview } from "../../_api/action";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

const ReviewForm = ({
  productId,
  review,
  customOnSuccess,
}: {
  productId?: string;
  review?: ReviewType;

  customOnSuccess?: () => void;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { addReview, error, isPending: addReviewIsPending } = useAddReview();
  const isLogin = useAuthStore((state) => state.isLogin);

  const {
    editReview,
    error: editError,
    isPending: editIsPending,
  } = useEditReview(review?._id || "");

  const [form] = useForm();

  useEffect(() => {
    if (review) {
      form.setFieldsValue(review);
    }
  }, [review]);

  const onSuccess = () => {
    form.resetFields();
    customOnSuccess && customOnSuccess();
  };

  const handleCreateReview = (values: any) => {
    console.log("🚀 ~ handleCreateReview ~ values:", values);
    addReview(
      { ...values, product: productId },
      {
        onSuccess,
      }
    );
  };

  const handleEditReview = (values: any) => {
    editReview(values, {
      onSuccess,
    });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={(values) => {
          if (review) {
            handleEditReview(values);
          } else {
            handleCreateReview(values);
          }
        }}
        layout="vertical"
        className="flex flex-col gap-3"
      >
        <Item
          name={"rating"}
          initialValue={4}
          rules={[
            {
              type: "number",
              min: 1,
              max: 5,
              message: "Minimum rating is 1",
            },
          ]}
        >
          <Rate allowHalf />
        </Item>
        <Item
          name={"title"}
          rules={[{ required: true, message: "Title is required" }]}
        >
          <TextArea rows={3} placeholder="Title" />
        </Item>

        <Button
          size="large"
          type={review ? "primary" : "default"}
          htmlType="submit"
          disabled={addReviewIsPending || editIsPending}
          loading={addReviewIsPending || editIsPending}
          onClick={() => {
            if (!isLogin) router.push(`/auth/login?redirect=${pathName}`);
          }}
        >
          {review ? "Edit Review" : "Add Review"}
        </Button>
      </Form>
      <Error error={error || editError} />
    </div>
  );
};

export default ReviewForm;
