import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import { List, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllConversations } from "../_api/query";
import ConversationItem from "./conversationItem";
import { ConversationsSkeleton } from "./conversationsSkeleton";
import { adminConversation } from "../welcome";

export const ConversationsList = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const {
    conversations,
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  } = useGetAllConversations();
  const {
    onlineUsers,
    socket,
    selectedConversation,
    setSelectedConversation,
    isOpen,
  } = useChatContext();
  const [renderedConversations, setRenderedConversations] = useState<
    ConversationType[]
  >([]);

  useEffect(() => {
    if (!isAdmin) {
      const { name, image } = adminConversation;
      if (conversations[0])
        setSelectedConversation({ ...conversations[0], name, image });
      else setSelectedConversation(adminConversation);
    }
  }, [isAdmin, conversations, setSelectedConversation, isOpen]);

  useEffect(() => {
    if (!conversations) return;
    if (page === 1) {
      setRenderedConversations(conversations);
      return;
    }
    setRenderedConversations((prev) => {
      const existingIds = new Set(prev.map((conv) => conv.id));
      const newConversations = conversations.filter(
        (conv) => !existingIds.has(conv.id)
      );
      return [...prev, ...newConversations];
    });
  }, [conversations, page]);

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

  const handleUpdateConversationLastMessage = useCallback(
    (message: lastMessageType) => {
      const conversation = renderedConversations.find(
        (conv) => conv.id === message.conversationId
      );
      if (conversation) {
        const isChatOpen = selectedConversation?.id === message.conversationId;

        let unread = message.unread;

        if (isChatOpen) unread = false;
        conversation.lastMessage = { ...message, unread };
        conversation.unreadCount = unread
          ? (conversation?.unreadCount || 0) + 1
          : conversation.unreadCount;
        setRenderedConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversation.id ? conversation : conv
          )
        );
      } else {
        refetch();
      }
    },
    [refetch, renderedConversations, selectedConversation]
  );

  const markConversationAsRead = (conversation: ConversationType) => {
    return {
      ...conversation,
      unreadCount: 0,
      lastMessage: { ...conversation.lastMessage!, unread: false },
    };
  };
  const handleSelectConversation = useCallback(
    (conversation: ConversationType) => {
      if (conversation?.id === selectedConversation?.id) {
        setSelectedConversation(null);
        return;
      }
      setSelectedConversation(conversation);
      const modifiedConversation = markConversationAsRead(conversation);
      setRenderedConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversation.id ? modifiedConversation : conv
        )
      );
    },
    [conversations, selectedConversation]
  );

  if (!isAdmin) return null;
  if (isPending) return <ConversationsSkeleton />;

  return (
    <div className="w-[300px] !border-r flex-1 border-gray-200 custom-scrollbar">
      <InfiniteScroll
        height={500}
        dataLength={renderedConversations.length}
        next={nextPage}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Spin size="small" />
          </div>
        }
        endMessage={
          pagination.current > 1 && (
            <p className="text-center text-gray-400 mt-2 mb-4">
              You are all caught up!
            </p>
          )
        }
      >
        {renderedConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            handleSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            onlineUsers={onlineUsers}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
