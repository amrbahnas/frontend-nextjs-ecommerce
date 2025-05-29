import { RefObject, useEffect, useRef } from "react";
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
}

export const useMessagesSocketEvents = ({
  socket,
  selectedConversation,
  setSelectedConversation,
  user,
  messagesEndRef,
  setRenderMessages,
}: UseSocketEventsProps) => {
  const lastMessageRef = useRef<MessageType | null>(null);

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
          lastMessageRef.current = message;
          setRenderMessages((prev) => [...prev, message]);
        }
      });
      return () => {
        if (socket) {
          socket?.off("newMessage");
        }
      };
    }
  }, [socket, selectedConversation?.id, user?.id]);

  // Separate effect to handle scrolling
  useEffect(() => {
    if (
      lastMessageRef.current &&
      lastMessageRef.current.senderId === user?.id
    ) {
      const element = messagesEndRef?.current;
      if (element) {
        requestAnimationFrame(() => {
          element.scrollTop = element.scrollHeight;
        });
      }
    }
  }, [lastMessageRef.current?.id]);

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
  }, [socket, selectedConversation?.id]);
};
