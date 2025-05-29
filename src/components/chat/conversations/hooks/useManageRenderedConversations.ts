import { useEffect, useState } from "react";

export const useManageRenderedConversations = (
  conversations: ConversationType[]
) => {
  const [renderedConversations, setRenderedConversations] = useState<
    ConversationType[]
  >([]);

  useEffect(() => {
    setRenderedConversations(conversations);
  }, [conversations.length]);

  return {
    renderedConversations,
    setRenderedConversations,
  };
};
