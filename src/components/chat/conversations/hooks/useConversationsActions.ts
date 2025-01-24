import { useCallback } from "react";

interface UseConversationsActionsProps {
  renderedConversations: ConversationType[];
  selectedConversation: ConversationType | null;
  setSelectedConversation: (conversation: ConversationType | null) => void;
  conversations: ConversationType[];
  refetch: () => void;
  setRenderedConversations: React.Dispatch<
    React.SetStateAction<ConversationType[]>
  >;
}

export const useConversationsActions = ({
  renderedConversations,
  selectedConversation,
  setSelectedConversation,
  conversations,
  refetch,
  setRenderedConversations,
}: UseConversationsActionsProps) => {
  const handleUpdateConversationLastMessage = useCallback(
    (message: lastMessageType) => {
      const conversation = renderedConversations.find(
        (conv) => conv.id === message.conversationId
      );
      if (conversation) {
        const isChatOpen = selectedConversation?.id === message.conversationId;

        let unread = message.unread;

        if (isChatOpen) unread = false;
        conversation.lastMessage = { ...message, unread };
        conversation.unreadCount = unread
          ? (conversation?.unreadCount || 0) + 1
          : conversation.unreadCount;
        setRenderedConversations((prev) =>
          prev.map((conv) =>
            conv.id === conversation.id ? conversation : conv
          )
        );
      } else {
        refetch();
      }
    },
    [refetch, renderedConversations, selectedConversation]
  );

  const markConversationAsRead = (conversation: ConversationType) => {
    return {
      ...conversation,
      unreadCount: 0,
      lastMessage: { ...conversation.lastMessage!, unread: false },
    };
  };
  const handleSelectConversation = useCallback(
    (conversation: ConversationType) => {
      if (conversation?.id === selectedConversation?.id) {
        setSelectedConversation(null);
        return;
      }
      setSelectedConversation(conversation);
      const modifiedConversation = markConversationAsRead(conversation);
      setRenderedConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversation.id ? modifiedConversation : conv
        )
      );
    },
    [conversations, selectedConversation]
  );

  return {
    handleSelectConversation,
    handleUpdateConversationLastMessage,
  };
};
