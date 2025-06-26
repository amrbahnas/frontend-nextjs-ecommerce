import { RefObject, useEffect, useCallback } from "react";

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
  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "auto") => {
      const element = messagesEndRef?.current;
      if (element) {
        const scrollHeight = element.scrollHeight;
        element.scrollTo({
          top: scrollHeight,
          behavior: behavior,
        });
      }
    },
    [messagesEndRef]
  );

  // Initial scroll when conversation opens
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen && selectedConversation) {
      // Add a longer delay to ensure content is rendered
      timer = setTimeout(() => {
        scrollToBottom();
      }, 300);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isOpen, selectedConversation?.id, scrollToBottom]);

  // Create a mutation observer to watch for content changes
  useEffect(() => {
    const element = messagesEndRef?.current;
    if (!element) return;

    const observer = new MutationObserver((mutations) => {
      // Check if mutations include content changes
      const hasContentChanges = mutations.some(
        (mutation) =>
          mutation.type === "childList" ||
          mutation.type === "characterData" ||
          mutation.addedNodes.length > 0
      );

      if (hasContentChanges) {
        scrollToBottom("smooth");
      }
    });

    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [messagesEndRef, scrollToBottom]);

  return { scrollToBottom };
};
