import { RefObject, useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseSocketEventsProps {
  socket: Socket | null;
  selectedConversation: ConversationType | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationType | null>
  >;
  user: User | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  setRenderMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  scrollToBottom: () => void;
}

export const useMessagesSocketEvents = ({
  socket,
  selectedConversation,
  setSelectedConversation,
  user,
  setRenderMessages,
  scrollToBottom,
}: UseSocketEventsProps) => {
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: MessageType) => {
      if (
        !selectedConversation?.id ||
        selectedConversation?.id === message.conversationId
      ) {
        if (message.senderId !== user?.id) {
          socket.emit("markMessageAsRead", {
            messageId: message.id,
          });
        }

        setRenderMessages((prev) => [...prev, message]);
        // Ensure DOM is updated before scrolling
        setTimeout(scrollToBottom, 50);
      }
    };

    const handleConversationUpdate = (conversationId: string) => {
      setSelectedConversation((prev) => ({ ...prev, id: conversationId }));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("updateSelectedConversation", handleConversationUpdate);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("updateSelectedConversation", handleConversationUpdate);
    };
  }, [
    socket,
    selectedConversation?.id,
    user?.id,
    setRenderMessages,
    scrollToBottom,
    setSelectedConversation,
  ]);
};
