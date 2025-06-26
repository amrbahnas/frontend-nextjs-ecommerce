import { useEffect, useRef } from "react";
import { adminConversation } from "../../../../welcome";

interface Props {
  isAdmin: boolean;
  conversations: ConversationType[];
  setSelectedConversation: (conversation: ConversationType | null) => void;
  isOpen: boolean;
}

export const useInitialConversationSelection = ({
  isAdmin,
  conversations,
  setSelectedConversation,
  isOpen,
}: Props) => {
  useEffect(() => {
    if (!isOpen || isAdmin) return;
    // Only run for non-admin users and when we haven't initialized yet
    if (!isAdmin && conversations.length > 0) {
      const { name, image } = adminConversation;
      setSelectedConversation({ ...conversations[0], name, image });
    } else {
      setSelectedConversation(adminConversation);
    }
  }, [isAdmin, conversations.length]);
};
