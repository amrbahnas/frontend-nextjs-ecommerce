"use client";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ConversationHeader } from "./ConversationHeader";
import { MessageList } from "./MessageList";
import { adminConversation } from "./adminConversation";
import { Conversations } from "./Conversations";
import useAuthStore from "@/store/useAuthStore";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      setSelectedConversation(adminConversation);
    }
  }, []);
  return (
    <div>
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
        style={{
          position: "fixed",
          bottom: "6rem",
          right: "2rem",
          margin: 0,
          padding: 0,
          top: "auto",
        }}
        className="!w-auto"
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
          <Conversations
            onSelectConversation={setSelectedConversation}
            selectedId={selectedConversation?.id}
          />
          <div
            className="w-[350px]"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            {selectedConversation || !isAdmin ? (
              <>
                <ConversationHeader conversation={selectedConversation} />
                <MessageList selectedConversation={selectedConversation} />
                <ChatInput selectedConversation={selectedConversation} />
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
    </div>
  );
};

export default ChatPopup;
