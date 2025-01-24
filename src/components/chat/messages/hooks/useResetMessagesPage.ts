import { RefObject, useEffect } from "react";

interface Props {
  isOpen: boolean;
  selectedConversation: ConversationType | null;
  setPage: (page: number) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const useResetMessagesPage = ({
  isOpen,
  selectedConversation,
  setPage,
  messagesEndRef,
}: Props) => {
  const scrollToBottom = () => {
    const element = messagesEndRef?.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen && selectedConversation) {
      setPage(1);
      scrollToBottom();
    }
  }, []);
};
