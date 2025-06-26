import ListItemsInfinityScroll from "@/components/shared/listItemsInfinityScroll";
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
  const { conversations, isPending, refetch, pagination, error } =
    useGetAllConversations({});

  const { onlineUsers, socket, selectedConversation, setSelectedConversation } =
    useChatContext();

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
    <div className="w-full  overflow-y-auto  !border-r flex-1 border-gray-200 custom-scrollbar">
      <ListItemsInfinityScroll
        data={renderedConversations}
        pagination={pagination}
        customColsNum={1}
        renderItem={(conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            handleSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            isOnline={onlineUsers.includes(conversation?.userId || "")}
          />
        )}
        isLoading={isPending}
        skeketonItem={(key) => <ConversationsSkeleton key={key} />}
        error={error}
      />
    </div>
  );
};
