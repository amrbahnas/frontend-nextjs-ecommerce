import useMutation from "@/hooks/apiHandler/useMutation";

export const useSendChatMessage = () => {
  const { mutate, isPending } = useMutation(`/chat/send`);

  return {
    sendMessage: mutate,
    isPending,
  };
};

export const useMarkMessageAsRead = (messageId: string) => {
  const { mutate, isPending } = useMutation(`/chat/messages/${messageId}/read`);

  return {
    markMessageAsRead: mutate,
    isPending,
  };
};

export const useMarkConversationAsRead = (conversationId: string) => {
  const { mutate, isPending } = useMutation(
    `/chat/conversations/${conversationId}/read`,
    {
      method: "patch",
    }
  );

  return {
    markConversationAsRead: mutate,
    isPending,
  };
};
