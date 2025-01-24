import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetMessages } from "../_api/query";
import { welcomeMessage } from "../welcome";
import { MessageItem } from "./messageItem";
import { MessageListSkeleton } from "./messageListSkeleton";

export const MessageList = () => {
  const { socket, isOpen, selectedConversation, setSelectedConversation } =
    useChatContext();
  const [renderedmessages, setRenderMessages] = useState<MessageType[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUserStore();

  const {
    messages,
    isPending,
    pagination,
    hasMore,
    nextPage,
    page,

    setPage,
  } = useGetMessages(selectedConversation?.id);

  const scrollToBottom = () => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen && selectedConversation) {
      setPage(1);
      scrollToBottom();
    }
  }, []);

  useEffect(() => {
    if (selectedConversation?.id) {
      if (messages) {
        if (page === 1) {
          setRenderMessages(messages);
          return;
        }
        setRenderMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg.id));

          const newMessages = messages.filter(
            (msg) => !existingIds.has(msg.id)
          );
          return [...prev, ...newMessages];
        });
      }
    } else {
      setRenderMessages([welcomeMessage]);
    }
  }, [messages]);

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
  }, [socket, user, setUser, selectedConversation]);

  if (isPending && pagination.current === 1) {
    return <MessageListSkeleton />;
  }

  return (
    <div
      id="scrollableDiv"
      className="custom-scrollbar"
      ref={messagesEndRef}
      style={{
        height: 500,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={renderedmessages.length}
        next={nextPage}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Spin size="small" />
          </div>
        }
        scrollableTarget="scrollableDiv"
        inverse={true}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          padding: "0 10px",
        }}
        endMessage={
          <p className="text-center text-gray-400 mt-2 mb-4">
            You are all caught up!
          </p>
        }
      >
        {renderedmessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            fromMe={message.senderId === user?.id}
            receiverProfileImg={selectedConversation?.image || ""}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
