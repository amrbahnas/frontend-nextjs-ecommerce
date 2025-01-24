import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseSocketEventsProps {
  socket: Socket | null;
  selectedConversation: ConversationType | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationType | null>
  >;
  user: User | null;

  setRenderMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

export const useMessagesSocketEvents = ({
  socket,
  selectedConversation,
  setSelectedConversation,
  user,

  setRenderMessages,
}: UseSocketEventsProps) => {
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: MessageType) => {
        if (
          !selectedConversation?.id ||
          selectedConversation?.id === message.conversationId
        ) {
          if (message.senderId !== user?.id) {
            socket.emit("markMessageAsRead", {
              messageId: message.id,
            });
          }
          setRenderMessages((prev) => [message, ...prev]);
        }
      });
      return () => {
        if (socket) {
          socket?.off("newMessage");
        }
      };
    }
  }, [socket, selectedConversation?.id, user?.id]);

  useEffect(() => {
    if (socket && selectedConversation) {
      socket.on("updateSelectedConversation", (conversationId: string) => {
        setSelectedConversation((prev) => ({ ...prev, id: conversationId }));
      });
      return () => {
        if (socket) {
          socket?.off("updateSelectedConversation");
        }
      };
    }
  }, [socket, user, selectedConversation]);
};
