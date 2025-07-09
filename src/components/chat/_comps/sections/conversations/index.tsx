import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import { useGetAllConversations } from "../../../_api/query";
import ConversationItem from "./conversationItem";
import { ConversationsSkeleton } from "./conversationsSkeleton";
import { useConversationsActions } from "./hooks/useConversationsActions";
import { useConversationsSocketEvents } from "./hooks/useConversationsSocketEvents";
import { useManageRenderedConversations } from "./hooks/useManageRenderedConversations";

export const ConversationsList = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const {
    onlineUsers,
    socket,
    selectedConversation,
    setSelectedConversation,
    isOpen,
  } = useChatContext();

  const { conversations, isPending, refetch, pagination, error } =
    useGetAllConversations({
      skip: !isOpen,
    });

  const { renderedConversations, setRenderedConversations } =
    useManageRenderedConversations(conversations);

  const { handleSelectConversation, handleUpdateConversationLastMessage } =
    useConversationsActions({
      renderedConversations,
      selectedConversation,
      setSelectedConversation,
      conversations,
      refetch,
      setRenderedConversations,
    });

  useConversationsSocketEvents({
    setRenderedConversations,
    socket,
    isAdmin,
    selectedConversation,
    refetch,
    handleUpdateConversationLastMessage,
    renderedConversations,
  });

  if (!isAdmin) return null;

  return (
    <InfiniteScroll<ConversationType>
      data={renderedConversations}
      onLoadMore={pagination.fetchNextPage}
      hasMore={pagination?.hasMore}
      loading={isPending}
      fetchingMoreLoading={pagination.isFetchingNextPage}
      customColsNum={1}
      className="w-full pe-3 h-80"
      customNoData={<p>No conversations found</p>}
      skeketonItem={(key) => <ConversationsSkeleton key={key} />}
      error={error}
      renderItem={(conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          handleSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          isOnline={onlineUsers.includes(conversation?.userId || "")}
        />
      )}
      // dependency={pagination.current < 2 ? conversations : 1}
    />
  );
};
