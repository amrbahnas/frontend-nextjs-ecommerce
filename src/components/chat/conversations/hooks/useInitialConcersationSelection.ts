import { useEffect } from "react";
import { adminConversation } from "../../welcome";

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
    if (!isAdmin) {
      const { name, image } = adminConversation;
      if (conversations[0])
        setSelectedConversation({ ...conversations[0], name, image });
      else setSelectedConversation(adminConversation);
    }
  }, [isAdmin, conversations, setSelectedConversation, isOpen]);
};
