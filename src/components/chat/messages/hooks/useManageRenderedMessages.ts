import { useEffect, useState } from "react";
import { welcomeMessage } from "../../welcome";

interface Props {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  page: number;
}

export const useManageRenderedMessages = ({
  selectedConversation,
  messages,
  page,
}: Props) => {
  const [renderedmessages, setRenderMessages] = useState<MessageType[]>([]);
  useEffect(() => {
    if (selectedConversation?.id) {
      if (messages) {
        if (page === 1) {
          setRenderMessages(messages);
          return;
        }
        setRenderMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg.id));

          const newMessages = messages.filter(
            (msg) => !existingIds.has(msg.id)
          );
          return [...prev, ...newMessages];
        });
      }
    } else {
      setRenderMessages([welcomeMessage]);
    }
  }, [messages]);

  return {
    renderedmessages,
    setRenderMessages,
  };
};
