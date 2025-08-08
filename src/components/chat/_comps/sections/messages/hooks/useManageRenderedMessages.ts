import { useEffect, useState } from "react";
import { welcomeMessage } from "../welcome";
import { useLocale } from "next-intl";
interface Props {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
}

export const useManageRenderedMessages = ({
  selectedConversation,
  messages,
}: Props) => {
  const [renderedmessages, setRenderMessages] = useState<MessageType[]>([]);
  const locale = useLocale();
  useEffect(() => {
    if (selectedConversation?.id) {
      setRenderMessages(messages);
    } else {
      setRenderMessages([welcomeMessage(locale as "en" | "ar")]);
    }
  }, [messages.length, selectedConversation?.id]);

  return {
    renderedmessages,
    setRenderMessages,
  };
};
