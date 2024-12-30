import { Input, Button } from "antd";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

import { ImagePreviewModal } from "./ImagePreviewModal";
import { useSendChatMessage } from "./_api/actions";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/socketContext";

export const ChatInput = ({
  selectedConversation,
}: {
  selectedConversation: ConversationType | null;
}) => {
  // const { sendMessage, isPending } = useSendChatMessage();
  const [isPending, setIsPending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
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
      socket?.emit(
        "sendMessage",
        payload
        // (mesage)=>{} // callback function to get the response, not required since  backend emit "newMessage" event for both sender and receiver
      );
      setNewMessage("");
      setImagePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsPending(false);
    }
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
      <Button
        shape="circle"
        icon={<PictureOutlined />}
        onClick={() => fileInputRef.current?.click()}
        size="large"
      />
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
      <ImagePreviewModal
        imagePreview={imagePreview}
        onCancel={() => setImagePreview(null)}
        onSend={() => {
          if (imageFile) {
            handleSendMessage("image", imageFile);
          }
        }}
      />
    </div>
  );
};
