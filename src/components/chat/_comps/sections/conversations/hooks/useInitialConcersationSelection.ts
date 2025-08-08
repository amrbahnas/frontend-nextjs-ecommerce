import { useEffect, useRef } from "react";
import { adminConversation } from "../../messages/welcome";
import { useLocale } from "next-intl";

interface Props {
  isAdmin: boolean;
  conversations: ConversationType[];
  selectedConversation: ConversationType | null;
  setSelectedConversation: (conversation: ConversationType | null) => void;
  isOpen: boolean;
  isPending: boolean;
}

export const useInitialConversationSelection = ({
  isAdmin,
  conversations,
  selectedConversation,
  setSelectedConversation,
  isOpen,
  isPending,
}: Props) => {
  const locale = useLocale();
  useEffect(() => {
    if (!isOpen || isAdmin || isPending) return;

    // Only run for non-admin users and when we haven't initialized yet
    if (!isAdmin && conversations.length > 0) {
      const { name, image } = adminConversation(locale as "en" | "ar");
      setSelectedConversation({ ...conversations[0], name, image });
    } else {
      !selectedConversation?.id &&
        setSelectedConversation(adminConversation(locale as "en" | "ar"));
    }
  }, [isAdmin, conversations.length, isOpen, selectedConversation, isPending]);
};
