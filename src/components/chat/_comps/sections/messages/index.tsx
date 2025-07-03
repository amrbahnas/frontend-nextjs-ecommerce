import { useGetMessages } from "@/components/chat/_api/query";
import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { useCallback, useRef } from "react";
import { useManageRenderedMessages } from "./hooks/useManageRenderedMessages";
import { useMessagesSocketEvents } from "./hooks/useMessagesSocketEvents";
import { MessageItem } from "./messageItem";
import { MessageListSkeleton } from "./messageListSkeleton";

export const MessageList = () => {
  const { socket, selectedConversation, setSelectedConversation } =
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
    <InfiniteScroll<MessageType>
      ref={scrollRef}
      data={renderedmessages}
      fetchingMoreLoading={pagination.isFetchingNextPage}
      renderItem={(message) => (
        <MessageItem
          key={message.id}
          message={message}
          fromMe={message.senderId === user?.id}
          receiverProfileImg={selectedConversation?.image || ""}
        />
      )}
      onLoadMore={pagination.fetchNextPage}
      hasMore={pagination?.hasMore}
      loading={isPending}
      customColsNum={1}
      customNoData={<p>Be the first to review this product</p>}
      skeketonItem={(key) => <MessageListSkeleton key={key} />}
      error={error}
      reverse={true}
      className="px-2"
    />
  );
};
