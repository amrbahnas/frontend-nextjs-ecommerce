"use client";
import { useState } from "react";
import { Button, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { Message, MessageType } from "./types";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "text",
      content: "Hello! How can I help you today?",
      isAdmin: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const sendMessage = (type: MessageType, content: string) => {
    if (!content.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        type,
        content,
        isAdmin: false,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setNewMessage("");
    setImagePreview(null);

    // Simulate admin response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: (Date.now() + 1).toString(),
          type: "text",
          content: "Thanks for your message! An admin will respond shortly.",
          isAdmin: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

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

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          width: "60px",
          height: "60px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      />

      <Modal
        title="Chat Support"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        width={400}
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "2rem",
          margin: 0,
          padding: 0,
          top: "auto",
        }}
        modalRender={(modal) => (
          <div
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {modal}
          </div>
        )}
        mask={false}
        maskClosable={false}
      >
        <div
          style={{ height: "500px", display: "flex", flexDirection: "column" }}
        >
          <MessageList messages={messages} />
          <ChatInput
            newMessage={newMessage}
            onMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            onImageSelect={handleImageUpload}
          />
        </div>
      </Modal>

      <ImagePreviewModal
        imagePreview={imagePreview}
        onCancel={() => setImagePreview(null)}
        onSend={() => {
          if (imagePreview) {
            sendMessage("image", imagePreview);
          }
        }}
      />
    </>
  );
};

export default ChatPopup;
