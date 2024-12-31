import useQuery from "@/hooks/apiHandler/useQuery";

export const useGetAllConversations = ({ skip }: { skip?: boolean }) => {
  const { data, isPending, refetch } = useQuery<any>("/chat/conversations", {
    skip,
  });
  return { conversations: data as ConversationType[], isPending, refetch };
};

export const useGetMessages = (conversationId: string | undefined) => {
  const { data, isPending } = useQuery<any>(`/chat/messages/${conversationId}`);
  return { messages: data as MessageType[], isPending };
};
