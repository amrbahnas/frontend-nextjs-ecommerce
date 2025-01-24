import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAllConversations = () => {
  const {
    data,
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  } = usePagination<ConversationType[]>("/chat/conversations", {
    staleTime: "0s",
  });
  return {
    conversations: data as ConversationType[],
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  };
};

export const useGetMessages = (conversationId: string | undefined) => {
  const {
    data,
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  } = usePagination<MessageType>(`/chat/messages/${conversationId}`, {
    skip: !conversationId,
    staleTime: "0s",
  });
  return {
    messages: data as MessageType[],
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
    setPage,
  };
};
