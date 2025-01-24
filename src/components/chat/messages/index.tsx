import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { Spin } from "antd";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetMessages } from "../_api/query";
import { useManageRenderedMessages } from "./hooks/useManageRenderedMessages";
import { useMessagesSocketEvents } from "./hooks/useMessagesSocketEvents";
import { useResetMessagesPage } from "./hooks/useResetMessagesPage";
import { MessageItem } from "./messageItem";
import { MessageListSkeleton } from "./messageListSkeleton";

export const MessageList = () => {
  const { socket, isOpen, selectedConversation, setSelectedConversation } =
    useChatContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  const { messages, isPending, pagination, hasMore, nextPage, page, setPage } =
    useGetMessages(selectedConversation?.id);

  const { renderedmessages, setRenderMessages } = useManageRenderedMessages({
    selectedConversation,
    messages,
    page,
  });

  useResetMessagesPage({
    isOpen,
    messagesEndRef,
    selectedConversation,
    setPage,
  });

  useMessagesSocketEvents({
    selectedConversation,
    socket,
    setRenderMessages,
    setSelectedConversation,
    user,
  });

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
