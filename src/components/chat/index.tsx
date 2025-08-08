"use client";
import { useState, useCallback } from "react";
import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import useBreakPoints from "@/hooks/global/userBreakPoints";
import { useInitialConversationSelection } from "./_comps/sections/conversations/hooks/useInitialConcersationSelection";
import { useGetAllConversations } from "./_api/query";
import { ChatModal } from "./_comps/root/ChatModal";
import { ChatTrigger } from "./_comps/root/ChatTrigger";
import { ChatContent } from "./_comps/root/ChatContent";
import { Spin } from "antd";

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

  const { conversations, isPending } = useGetAllConversations({
    skip: !isOpen || isAdmin,
  });

  // set initial conversation case  Role is user
  useInitialConversationSelection({
    isAdmin,
    conversations,
    selectedConversation,
    setSelectedConversation,
    isOpen,
    isPending,
  });

  const onOpenChat = useCallback(() => {
    setIsOpen(true);
    setHasNotification(false);
    setNotificationContent("");
  }, [setIsOpen, setHasNotification, setNotificationContent]);

  const onCloseChat = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  return (
    <>
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
        <Spin spinning={isPending}>
          <ChatContent
            isAdmin={isAdmin}
            isLargeScreen={isLargeScreen}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        </Spin>
      </ChatModal>
    </>
  );
};

export default Chat;
