import { Input, Button } from "antd";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { MessageType } from "./types";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { useSendChatMessage } from "./_api/actions";
import toast from "react-hot-toast";

export const ChatInput = ({
  selectedConversation,
}: {
  selectedConversation: ConversationType | null;
}) => {
  const { sendMessage, isPending } = useSendChatMessage();
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (type: string, content: string) => {
    sendMessage(
      {
        receiverId: selectedConversation?.user.id || "",
        content,
      },
      {
        onSuccess: () => {
          setNewMessage("");
          toast.success("Message sent successfully");
        },
      }
    );
  };

  return (
    <div
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
      {/* <Button
        shape="circle"
        icon={<PictureOutlined />}
        onClick={() => fileInputRef.current?.click()}
        size="large"
      /> */}
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onPressEnter={() => handleSendMessage("text", newMessage)}
        placeholder="Type your message..."
        style={{ borderRadius: "20px" }}
        size="large"
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={() => handleSendMessage("text", newMessage)}
        size="large"
        loading={isPending}
      />
      {/* <ImagePreviewModal
        imagePreview={imagePreview}
        onCancel={() => setImagePreview(null)}
        onSend={() => {
          if (imagePreview) {
            sendMessage("image", imagePreview);
          }
        }}
      /> */}
    </div>
  );
};
