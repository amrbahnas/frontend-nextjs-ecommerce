import { useEffect, useState } from "react";

export const useManageRenderedConversations = ({
  conversations,
  page,
}: {
  conversations: ConversationType[];
  page: number;
}) => {
  const [renderedConversations, setRenderedConversations] = useState<
    ConversationType[]
  >([]);

  useEffect(() => {
    if (!conversations) return;
    if (page === 1) {
      setRenderedConversations(conversations);
      return;
    }
    setRenderedConversations((prev) => {
      const existingIds = new Set(prev.map((conv) => conv.id));
      const newConversations = conversations.filter(
        (conv) => !existingIds.has(conv.id)
      );
      return [...prev, ...newConversations];
    });
  }, [conversations, page]);

  return {
    renderedConversations,
    setRenderedConversations,
  };
};
