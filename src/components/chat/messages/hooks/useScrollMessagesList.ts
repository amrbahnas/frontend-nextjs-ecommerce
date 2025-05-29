import { RefObject, useEffect } from "react";

interface Props {
  isOpen: boolean;
  selectedConversation: ConversationType | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const useScrollMessagesList = ({
  isOpen,
  selectedConversation,
  messagesEndRef,
}: Props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen && selectedConversation) {
      const element = messagesEndRef?.current;
      if (element) {
        // Add a small delay to ensure content is rendered
        timer = setTimeout(() => {
          element.scrollTop = element.scrollHeight;
        }, 100);
      }
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, selectedConversation?.id]);
};
