import usePagination from "@/hooks/apiHandler/usePagination";
import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAllConversations = () => {
  const { data, isPending, refetch, pagination, hasMore, nextPage, page } =
    usePagination<ConversationType[]>("/chat/conversations");
  return {
    conversations: data as ConversationType[],
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
  };
};

export const useGetMessages = (conversationId: string | undefined) => {
  const { data, isPending, refetch, pagination, hasMore, nextPage, page } =
    usePagination<MessageType>(`/chat/messages/${conversationId}`, {
      skip: !conversationId,
    });
  return {
    messages: data as MessageType[],
    isPending,
    refetch,
    pagination,
    hasMore,
    nextPage,
    page,
  };
};
