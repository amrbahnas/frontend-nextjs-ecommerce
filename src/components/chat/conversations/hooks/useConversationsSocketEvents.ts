import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseSocketEventsProps {
  setPage: (page: number) => void;
  setRenderedConversations: React.Dispatch<
    React.SetStateAction<ConversationType[]>
  >;
  socket: Socket | null;
  isAdmin: boolean;
  selectedConversation: ConversationType | null;
  refetch: () => void;
  handleUpdateConversationLastMessage: (message: lastMessageType) => void;
  renderedConversations: ConversationType[];
}

export const useConversationsSocketEvents = ({
  setPage,
  setRenderedConversations,
  socket,
  isAdmin,
  selectedConversation,
  refetch,
  handleUpdateConversationLastMessage,
  renderedConversations,
}: UseSocketEventsProps) => {
  useEffect(() => {
    if (socket && selectedConversation) {
      socket.on("updateConversationLastSeen", (userId) => {
        setRenderedConversations((prev) =>
          prev.map((conv) =>
            conv.userId === userId
              ? {
                  ...conv,
                  lastSeen: new Date(),
                }
              : conv
          )
        );
      });
      return () => {
        socket.off("updateConversationLastSeen");
      };
    }
  }, [socket, selectedConversation]);

  useEffect(() => {
    if (socket) {
      socket.on("newConversation", () => {
        setPage(1);
        refetch();
      });
      return () => {
        socket.off("newConversation");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && isAdmin) {
      socket?.on(
        "updateConversationLastMessage",
        (message: lastMessageType) => {
          handleUpdateConversationLastMessage(message);
        }
      );
    }
    return () => {
      if (socket) {
        socket?.off("updateConversationLastMessage");
      }
    };
  }, [socket, isAdmin, renderedConversations, refetch, selectedConversation]);
};
