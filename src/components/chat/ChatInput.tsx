import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRef, useState } from "react";
import { useSocketContext } from "@/context/socketContext";
import { ImagePreviewModal } from "./ImagePreviewModal";

interface ChatFormValues {
  message: string;
}

export const ChatInput = ({
  selectedConversation,
}: {
  selectedConversation: ConversationType | null;
}) => {
  const [form] = Form.useForm<ChatFormValues>();
  const [isPending, setIsPending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { socket } = useSocketContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (type: string, content: string | File) => {
    const payload = {
      content,
      type,
      receiverId: selectedConversation?.user.id || "",
    };
    try {
      setIsPending(true);
      socket?.emit("sendMessage", payload);
      form.resetFields();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsPending(false);
    }
  };

  const onFinish = (values: ChatFormValues) => {
    if (values.message.trim()) {
      handleSendMessage("text", values.message);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      style={{
        padding: "10px",
        display: "flex",
        gap: "8px",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />
      <Button
        shape="circle"
        icon={<PictureOutlined />}
        onClick={() => fileInputRef.current?.click()}
        size="large"
        loading={isPending}
      />
      <Form.Item
        name="message"
        style={{ flex: 1, margin: 0 }}
        rules={[{ required: true, message: "" }]}
      >
        <Input
          placeholder="Type your message..."
          style={{ borderRadius: "20px" }}
          size="large"
          disabled={isPending}
        />
      </Form.Item>
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        htmlType="submit"
        size="large"
        loading={isPending}
      />
      <ImagePreviewModal
        imagePreview={imagePreview}
        onCancel={() => setImagePreview(null)}
        onSend={() => {
          if (imageFile) {
            handleSendMessage("image", imageFile);
          }
        }}
      />
    </Form>
  );
};
