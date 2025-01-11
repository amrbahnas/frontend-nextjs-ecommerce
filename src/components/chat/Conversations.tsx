import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import { List, Spin } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllConversations } from "./_api/query";
import ConversationItem from "./conversationItem";
import { ConversationsSkeleton } from "./ConversationsSkeleton";
import { adminConversation } from "./adminConversation";

export const Conversations = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const {
    conversations,
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
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
      setSelectedConversation(conversations[0] || adminConversation);
    }
  }, [isAdmin, conversations, setSelectedConversation]);

  useEffect(() => {
    if (!conversations) return;
    if (page === 1) {
      setRenderedConversations(conversations);
    } else {
      setRenderedConversations((prev) => {
        const newConversations = conversations.filter(
          (newConv) => !prev.some((prevConv) => prevConv.id === newConv.id)
        );
        return [...prev, ...newConversations];
      });
    }
  }, [conversations?.length, page]);

  useEffect(() => {
    if (isOpen && isAdmin) refetch();
  }, [isOpen, refetch]);

  useEffect(() => {
    if (socket && isAdmin) {
      socket?.on(
        "updateConversationLastMessage",
        (message: lastMessageType) => {
          const conversation = renderedConversations.find(
            (conv) => conv.id === message.conversationId
          );
          if (conversation) {
            conversation.lastMessage = message;
            setRenderedConversations(
              renderedConversations.map((conv) =>
                conv.id === conversation.id ? conversation : conv
              )
            );
          } else {
            refetch();
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket?.off("updateConversationLastMessage");
      }
    };
  }, [socket, isAdmin, renderedConversations, refetch]);

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
  if (isPending) return <ConversationsSkeleton />;

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
