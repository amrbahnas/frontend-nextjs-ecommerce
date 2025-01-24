import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllConversations } from "../_api/query";
import ConversationItem from "./conversationItem";
import { ConversationsSkeleton } from "./conversationsSkeleton";
import { useConversationsActions } from "./hooks/useConversationsActions";
import { useConversationsSocketEvents } from "./hooks/useConversationsSocketEvents";
import { useInitialConversationSelection } from "./hooks/useInitialConcersationSelection";
import { useManageRenderedConversations } from "./hooks/useManageRenderedConversations";

export const ConversationsList = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const {
    conversations,
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  } = useGetAllConversations();
  const {
    onlineUsers,
    socket,
    selectedConversation,
    setSelectedConversation,
    isOpen,
  } = useChatContext();

  useInitialConversationSelection({
    conversations,
    isAdmin,
    setSelectedConversation,
    isOpen,
  });

  const { renderedConversations, setRenderedConversations } =
    useManageRenderedConversations({
      conversations,
      page,
    });

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
    setPage,
    setRenderedConversations,
    socket,
    isAdmin,
    selectedConversation,
    refetch,
    handleUpdateConversationLastMessage,
    renderedConversations,
  });

  if (!isAdmin) return null;
  if (isPending) return <ConversationsSkeleton />;

  return (
    <div className="w-[300px] !border-r flex-1 border-gray-200 custom-scrollbar">
      <InfiniteScroll
        height={500}
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
        {renderedConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            handleSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            isOnline={onlineUsers.includes(conversation?.userId || "")}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
