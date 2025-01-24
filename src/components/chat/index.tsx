"use client";
import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import { MessageOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Tooltip } from "antd";
import { ChatInput } from "./chatInput";
import { ConversationHeader } from "./conversations/conversationHeader";
import { ConversationsList } from "./conversations";
import { MessageList } from "./messages";

const Chat = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const {
    isOpen,
    setIsOpen,
    selectedConversation,
    setSelectedConversation,
    hasNotification,
    setHasNotification,
    notificationContent,
    setNotificationContent,
  } = useChatContext();

  const onOpenChat = () => {
    setIsOpen(true);
    setHasNotification(false);
    setNotificationContent("");
  };

  const onCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Tooltip
        open={!!notificationContent}
        title={notificationContent}
        placement="left"
        color="blue"
      >
        <FloatButton
          onClick={onOpenChat}
          shape="circle"
          tooltip={notificationContent ? "" : "Chat Support"}
          type="primary"
          badge={{
            count: hasNotification ? "!" : 0,
            offset: [0, 5],
          }}
          icon={<MessageOutlined className="!text-white" />}
          className=" !w-16 !h-16 !z-50"
        />
      </Tooltip>

      <Modal
        title={isAdmin ? "Chat Support" : <ConversationHeader />}
        open={isOpen}
        onClose={onCloseChat}
        onCancel={onCloseChat}
        destroyOnClose
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
        styles={{
          content: {
            paddingBottom: 0,
          },
        }}
        modalRender={(modal) => (
          <div
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            className=" overflow-hidden rounded-lg"
          >
            {modal}
          </div>
        )}
        mask={false}
        // maskClosable={false}
      >
        <div className="flex  h-[500px] mt-2">
          <ConversationsList />
          {selectedConversation ? (
            <div className="w-[350px] flex-1 flex flex-col">
              {isAdmin && <ConversationHeader />}
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="w-[350px] flex-1 flex flex-col">
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start chatting
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
