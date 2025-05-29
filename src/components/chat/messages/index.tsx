import ListItemsInfinityScroll from "@/components/listItemsInfinityScroll";
import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { useRef } from "react";
import { useGetMessages } from "../_api/query";
import { useManageRenderedMessages } from "./hooks/useManageRenderedMessages";
import { useMessagesSocketEvents } from "./hooks/useMessagesSocketEvents";
import { useScrollMessagesList } from "./hooks/useScrollMessagesList";
import { MessageItem } from "./messageItem";
import { MessageListSkeleton } from "./messageListSkeleton";

export const MessageList = () => {
  const { socket, isOpen, selectedConversation, setSelectedConversation } =
    useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // scroll messages list to bottom when open
  useScrollMessagesList({
    isOpen,
    messagesEndRef,
    selectedConversation,
  });

  // handle messages socket events (send message, updateSelectedConversation)
  useMessagesSocketEvents({
    selectedConversation,
    socket,
    setRenderMessages,
    setSelectedConversation,
    messagesEndRef,
    user,
  });

  // render messages list
  return (
    <div
      ref={messagesEndRef}
      className="flex-1 overflow-y-auto custom-scrollbar p-4 "
    >
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
    </div>
  );
};
