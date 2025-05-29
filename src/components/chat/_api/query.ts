import useInfiniteQuery from "@/hooks/apiHandler/useInfiniteQuery";

export const useGetAllConversations = () => {
  const { data, isPending, refetch, pagination, error } = useInfiniteQuery<
    ConversationType[]
  >("/chat/conversations", {
    staleTime: "0s",
  });
  return {
    conversations: data as ConversationType[],
    isPending,
    refetch,
    pagination,
    error,
  };
};

export const useGetMessages = (conversationId: string | undefined) => {
  const { data, isPending, refetch, pagination, error } = useInfiniteQuery<
    MessageType[]
  >(`/chat/messages/${conversationId}`, {
    skip: !conversationId,
    staleTime: "0s",
    reverse: true,
  });
  return {
    messages: data,
    isPending,
    refetch,
    pagination,
    error,
  };
};
