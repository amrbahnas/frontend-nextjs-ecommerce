import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { MessageItem } from "./MessageItem";
import { MessageListSkeleton } from "./MessageListSkeleton";
import { Spin } from "antd";
import { useGetMessages } from "./_api/query";

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
    refetch,
    setPage,
  } = useGetMessages(selectedConversation?.id);
  console.log("🚀 ~ file: MessageList.tsx:21 ~ messages:", messages);

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
    if (messages) {
      setRenderMessages((prev) => {
        // Create a Set of existing message IDs for quick lookup
        const existingIds = new Set(prev.map((msg) => msg.id));
        // Only add messages that don't already exist
        const newMessages = messages.filter((msg) => !existingIds.has(msg.id));
        return [...prev, ...newMessages];
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: MessageType) => {
        console.log("🚀 ~ file: MessageList.tsx:35 ~ message:", message);
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
    if (socket) {
      socket.on("newConversation", (conversation: ConversationType) => {
        setSelectedConversation((prev) => ({ ...prev, id: conversation.id }));
      });
      return () => {
        if (socket) {
          socket?.off("newConversation");
        }
      };
    }
  }, [socket, user, setUser]);

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
        {/* <div ref={messagesEndRef}> */}
        {renderedmessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            fromMe={message.senderId === user?.id}
            receiverProfileImg={selectedConversation?.image || ""}
          />
        ))}
        {/* </div> */}
      </InfiniteScroll>
    </div>
  );
};
