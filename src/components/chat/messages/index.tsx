import ListItemsInfinityScroll from "@/components/shared/listItemsInfinityScroll";
import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { useRef, useEffect, useCallback } from "react";
import { useGetMessages } from "../_api/query";
import { useManageRenderedMessages } from "./hooks/useManageRenderedMessages";
import { useMessagesSocketEvents } from "./hooks/useMessagesSocketEvents";
import { useScrollMessagesList } from "./hooks/useScrollMessagesList";
import { MessageItem } from "./messageItem";
import { MessageListSkeleton } from "./messageListSkeleton";

export const MessageList = () => {
  const { socket, isOpen, selectedConversation, setSelectedConversation } =
    useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

  // get messages
  const { messages, isPending, pagination, error } = useGetMessages(
    selectedConversation?.id
  );

  // set rendered messages with backend messages
  const { renderedmessages, setRenderMessages } = useManageRenderedMessages({
    selectedConversation,
    messages,
  });

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Scroll when messages change
  useEffect(() => {
    if (renderedmessages.length > 0) {
      scrollToBottom();
    }
  }, [renderedmessages.length, selectedConversation?.id]);

  // handle messages socket events
  useMessagesSocketEvents({
    selectedConversation,
    socket,
    setRenderMessages,
    setSelectedConversation,
    messagesEndRef: scrollRef,
    user,
    scrollToBottom,
  });

  if (!renderedmessages.length) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
      <ListItemsInfinityScroll
        data={renderedmessages}
        pagination={pagination}
        threshold={500}
        reverse={true}
        customColsNum={1}
        renderItem={(message) => (
          <MessageItem
            key={message.id}
            message={message}
            fromMe={message.senderId === user?.id}
            receiverProfileImg={selectedConversation?.image || ""}
          />
        )}
        isLoading={isPending}
        skeketonItem={(key) => <MessageListSkeleton key={key} />}
        error={error}
      />
      <div ref={scrollRef} style={{ height: "1px" }} />
    </div>
  );
};
