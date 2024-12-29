"use client";
import { useState } from "react";
import { Button, Modal } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { Message, MessageType } from "./types";
import { Conversations } from "./Conversations";
import { Conversation } from "./ConversationTypes";
import { ConversationHeader } from "./ConversationHeader";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      userName: "John Doe",
      lastMessage: "Hello! How can I help you today?",
      timestamp: "10:30 AM",
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: "2",
      userName: "Jane Smith",
      userImage: "https://xsgames.co/randomusers/avatar.php?g=female",
      lastMessage: "Thanks for your help!",
      timestamp: "Yesterday",
      isOnline: false,
    },
    {
      id: "3",
      userName: "Support Team",
      lastMessage: "Your order has been shipped",
      timestamp: "2 days ago",
      isOnline: true,
    },
  ]);
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

    const newMsg = {
      id: Date.now().toString(),
      type,
      content,
      isAdmin: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMsg]);
    
    // Update last message in conversation
    if (selectedConversation) {
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, lastMessage: content, timestamp: "Just now" }
          : conv
      ));
    }

    setNewMessage("");
    setImagePreview(null);

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "text" as MessageType,
        content: "Thanks for your message! An admin will respond shortly.",
        isAdmin: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prevMessages => [...prevMessages, adminResponse]);
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
        width={800}
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
          style={{
            height: "500px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ width: "300px" }}>
            <Conversations
              conversations={conversations}
              onSelectConversation={setSelectedConversation}
              selectedId={selectedConversation?.id}
            />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {selectedConversation ? (
              <>
                <ConversationHeader conversation={selectedConversation} />
                <MessageList messages={messages} />
                <ChatInput
                  newMessage={newMessage}
                  onMessageChange={setNewMessage}
                  onSendMessage={sendMessage}
                  onImageSelect={handleImageUpload}
                />
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#999",
                }}
              >
                Select a conversation to start chatting
              </div>
            )}
          </div>
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
