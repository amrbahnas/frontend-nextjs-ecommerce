import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRef, useState } from "react";
import { useChatContext } from "@/context/chatContext";
import { ImagePreviewModal } from "./ImagePreviewModal";
import toast from "react-hot-toast";

interface ChatFormValues {
  message: string;
}

export const ChatInput = () => {
  const [form] = Form.useForm<ChatFormValues>();
  const [loadingState, setLoadingState] = useState<{
    type: string;
    loading: boolean;
  }>({
    type: "text",
    loading: false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { socket, selectedConversation } = useChatContext();

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
    if (!socket) {
      toast.error("Socket is not connected");
      return;
    }

    const payload = {
      content,
      type,
      participantsIds: selectedConversation?.participants?.map(
        (p: User) => p.id
      ),
    };

    try {
      setLoadingState({ type, loading: true });
      socket.emit("sendMessage", payload, () => {
        form.resetFields();
        setImagePreview(null);
        setImageFile(null);
        setLoadingState({ type, loading: false });
      });
    } catch (error) {
      setLoadingState({ type, loading: false });
      toast.error("Failed to send message");
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
        loading={loadingState.type === "image" && loadingState.loading}
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
          disabled={loadingState.loading}
        />
      </Form.Item>
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        htmlType="submit"
        size="large"
        loading={loadingState.type === "text" && loadingState.loading}
      />
      <ImagePreviewModal
        imagePreview={imagePreview}
        loading={loadingState.type === "image" && loadingState.loading}
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
