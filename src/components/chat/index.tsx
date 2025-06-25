"use client";
import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import {
  MessageOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FloatButton, Modal, Tooltip } from "antd";
import { useState } from "react";
import { ChatInput } from "./chatInput";
import { ConversationHeader } from "./conversations/conversationHeader";
import { ConversationsList } from "./conversations";
import { MessageList } from "./messages";

const Chat = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const {
    isOpen,
    setIsOpen,
    selectedConversation,

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
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
        title={<span>{isAdmin ? "Chat Support" : <ConversationHeader />}</span>}
        open={isOpen}
        onClose={onCloseChat}
        onCancel={onCloseChat}
        closeIcon={
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 pr-4"
          >
            <button
              onClick={toggleFullScreen}
              className="border-none bg-transparent cursor-pointer hover:text-blue-500 p-1"
            >
              {isFullScreen ? (
                <FullscreenExitOutlined className="text-gray-400" />
              ) : (
                <FullscreenOutlined className="text-gray-400" />
              )}
            </button>
            <CloseOutlined
              onClick={onCloseChat}
              className="text-gray-400 cursor-pointer hover:text-red-500"
            />
          </div>
        }
        destroyOnClose
        footer={null}
        className={` ${
          isFullScreen
            ? "!w-screen !h-screen !top-2"
            : "!w-auto !fixed !bottom-24 !right-8 !m-0 !p-0 !top-auto"
        } [&_.ant-modal-close:hover]:!bg-transparent [&_.ant-modal-close:hover]:!text-gray-400`}
        styles={{
          content: {
            paddingBottom: 0,
          },
          wrapper: {
            overflow: "hidden",
          },
        }}
        modalRender={(modal) => (
          <div
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            className={`overflow-hidden rounded-lg ${
              isFullScreen ? "!rounded-none" : ""
            }`}
          >
            {modal}
          </div>
        )}
        mask={isFullScreen}
        maskClosable={true}
      >
        <div
          className={`flex ${
            isFullScreen ? "h-[calc(100vh-80px)]" : "h-[500px]"
          } mt-2`}
        >
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
