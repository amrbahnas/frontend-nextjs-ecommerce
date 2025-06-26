"use client";
import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import {
  MessageOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { FloatButton, Modal, Tooltip } from "antd";
import { useState } from "react";
import classNames from "classnames";
import { ChatInput } from "./chatInput";
import { ConversationHeader } from "./conversations/conversationHeader";
import { ConversationsList } from "./conversations";
import { MessageList } from "./messages";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { useInitialConversationSelection } from "./conversations/hooks/useInitialConcersationSelection";
import { useGetAllConversations } from "./_api/query";

type Conversation = any; // Replace with your actual conversation type

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  isLargeScreen: boolean;
  children: React.ReactNode;
}

const ChatModal = ({
  isOpen,
  onClose,
  isFullScreen,
  toggleFullScreen,
  isLargeScreen: lg,
  children,
}: ChatModalProps) => (
  <Modal
    title={
      <span>
        {useAuthStore.getState().isAdmin ? (
          "Chat Support"
        ) : (
          <ConversationHeader />
        )}
      </span>
    }
    open={isOpen}
    onClose={onClose}
    onCancel={onClose}
    closeIcon={
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-2 pr-4"
      >
        {lg && (
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
        )}
        <CloseOutlined
          onClick={onClose}
          className="text-gray-400 cursor-pointer hover:text-red-500"
        />
      </div>
    }
    destroyOnClose
    footer={null}
    className={classNames(
      {
        "!w-screen !h-screen !top-4": isFullScreen || !lg,
        "!w-auto !fixed sm:!bottom-24 sm:!right-8 !m-0 !p-0 sm:!top-auto":
          !isFullScreen && lg,
      },
      "[&_.ant-modal-close:hover]:!bg-transparent",
      "[&_.ant-modal-close:hover]:!text-gray-400"
    )}
    styles={{
      content: { paddingBottom: 0 },
      wrapper: { overflow: "hidden" },
    }}
    modalRender={(modal) => (
      <div
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        className={classNames("overflow-hidden rounded-lg", {
          "!rounded-none": isFullScreen || !lg,
        })}
      >
        {modal}
      </div>
    )}
    mask={isFullScreen || !lg}
    maskClosable={true}
  >
    <div
      className={classNames("flex mt-2", {
        "h-[calc(100dvh-100px)]": isFullScreen || !lg,
        "h-[500px]": !isFullScreen && lg,
      })}
    >
      {children}
    </div>
  </Modal>
);

interface ChatTriggerProps {
  onOpenChat: () => void;
  hasNotification: boolean;
  notificationContent: string;
}

const ChatTrigger = ({
  onOpenChat,
  hasNotification,
  notificationContent,
}: ChatTriggerProps) => (
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
      className="!w-16 !h-16 !z-50"
    />
  </Tooltip>
);

interface ChatContentProps {
  isAdmin: boolean;
  isLargeScreen: boolean;
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

const ChatContent = ({
  isAdmin,
  isLargeScreen: lg,
  selectedConversation,
  setSelectedConversation,
}: ChatContentProps) => {
  if (!isAdmin) {
    return (
      <div className="w-full flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>
            <ChatInput />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={classNames("transition-all duration-300", {
          "w-[350px]": lg,
          "w-full": !lg && !selectedConversation,
          hidden: !lg && selectedConversation,
        })}
      >
        <div className="h-full overflow-y-auto">
          <ConversationsList />
        </div>
      </div>
      <div
        className={classNames(
          "flex-1 lg:w-[350px] flex flex-col transition-all duration-300",
          {
            block: lg || selectedConversation,
            hidden: !lg && !selectedConversation,
          }
        )}
      >
        {selectedConversation ? (
          <>
            {isAdmin && (
              <div className="flex items-center pb-2 px-2 gap-2">
                {!lg && (
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeftOutlined />
                  </button>
                )}
                <ConversationHeader />
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>
            <ChatInput />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </>
  );
};

const Chat = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const lg = useBreakPoints("lg");
  const isLargeScreen = typeof lg === "object" ? lg.lg : lg;

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

  // use for get user conversations
  const { conversations } = useGetAllConversations({
    skip: isAdmin || !isOpen,
  });

  // use for set initial conversation case is user
  useInitialConversationSelection({
    isAdmin,
    conversations,
    setSelectedConversation,
    isOpen,
  });

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
      <ChatTrigger
        onOpenChat={onOpenChat}
        hasNotification={hasNotification}
        notificationContent={notificationContent}
      />
      <ChatModal
        isOpen={isOpen}
        onClose={onCloseChat}
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
        isLargeScreen={isLargeScreen}
      >
        <ChatContent
          isAdmin={isAdmin}
          isLargeScreen={isLargeScreen}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </ChatModal>
    </div>
  );
};

export default Chat;
