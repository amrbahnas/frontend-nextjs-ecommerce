import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { List, Spin } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import ConversationItem from "./conversationItem";
import { ConversationsSkeleton } from "./ConversationsSkeleton";

export const Conversations = () => {
  const { onlineUsers, socket, selectedConversation, setSelectedConversation } =
    useChatContext();
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [renderedConversations, setRenderedConversations] = useState<
    ConversationType[]
  >([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (socket && isAdmin) {
      setLoadingConversations(true);
      socket.emit(
        "getConversations",
        { page, pageSize: 10 },
        ({ success, error, conversations, hasMore }: any) => {
          if (success) {
            if (page === 1) {
              setRenderedConversations(conversations);
            } else {
              setRenderedConversations((prev) => [...prev, ...conversations]);
            }
            setHasMore(hasMore);
          } else {
            toast.error(error);
          }
          setLoadingConversations(false);
        }
      );
    }
    return () => {
      if (socket) {
        socket?.off("getConversations");
      }
    };
  }, [socket, isAdmin, user, page]);

  useEffect(() => {
    if (socket && isAdmin) {
      socket?.on(
        "updateConversationLastMessage",
        (message: lastMessageType) => {
          if (message.conversationId === selectedConversation?.id) {
            updateLastMessage(message);
          } else {
            updateLastMessage(message);
            increaseUnreadCount(message.conversationId);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket?.off("updateConversationLastMessage");
      }
    };
  }, [socket, selectedConversation, isAdmin]);

  const updateLastMessage = (message: lastMessageType) => {
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message }
          : conv
      )
    );
  };

  const increaseUnreadCount = (conversationId: string) => {
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, unreadCount: (conv?.unreadCount || 0) + 1 }
          : conv
      )
    );
  };

  const handleResetConversationReadCount = (
    conversationId: string | undefined
  ) => {
    if (!conversationId) return;
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSelectConversation = (conversation: ConversationType) => {
    if (conversation?.id === selectedConversation?.id) {
      setSelectedConversation(null);
      return;
    }
    setSelectedConversation(conversation);
    if (conversation?.unreadCount! > 0) {
      socket?.emit(
        "markConversationAsRead",
        { conversationId: conversation.id },
        () => {
          handleResetConversationReadCount(conversation.id);
        }
      );
    }
  };

  if (!isAdmin) return null;
  if (loadingConversations) return <ConversationsSkeleton />;

  return (
    <div
      className="w-[300px] !border-r flex-1 border-gray-200 custom-scrollbar"
      style={{
        height: "500px",
        overflow: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={renderedConversations.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Spin size="small" />
          </div>
        }
        endMessage={
          page > 1 && (
            <p className="text-center text-gray-400 mt-2 mb-4">
              You are all caught up!
            </p>
          )
        }
      >
        <List
          className="conversations-list"
          itemLayout="horizontal"
          dataSource={renderedConversations}
          renderItem={(conversation) => (
            <ConversationItem
              conversation={conversation}
              handleSelectConversation={handleSelectConversation}
              selectedConversation={selectedConversation}
              onlineUsers={onlineUsers}
            />
          )}
          style={{
            height: "100%",
            overflowY: "auto",
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
