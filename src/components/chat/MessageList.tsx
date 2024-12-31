import { useSocketContext } from "@/context/socketContext";
import useUserStore from "@/store/useUserStore";
import { List } from "antd";
import { useEffect, useState, useRef } from "react";
import { useGetMessages } from "./_api/query";
import { adminConversation } from "./adminConversation";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  selectedConversation: ConversationType | null;
}

export const MessageList = ({ selectedConversation }: MessageListProps) => {
  const { messages, isPending } = useGetMessages(selectedConversation?.id);
  const { socket } = useSocketContext();
  const user = useUserStore((state) => state.user);
  const [Renderedmessages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      type: "text",
      content: "Hello! How can I help you today?",
      createdAt: new Date(),
      senderId: adminConversation.participants[0].id,
      isRead: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages) {
      setMessages((prev) => [...prev, ...messages]);
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: MessageType) => {
        console.log("🚀 ~ file: MessageList.tsx:39 ~ message:", message);
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Renderedmessages]);

  return (
    <List
      className="chat-messages"
      itemLayout="horizontal"
      loading={isPending}
      dataSource={Renderedmessages}
      renderItem={(message) => (
        <List.Item
          key={message.id}
          style={{
            justifyContent:
              message.senderId === user?.id ? "flex-end" : "flex-start",
            border: "none",
            padding: "8px 0",
          }}
        >
          <MessageItem
            message={message}
            fromMe={message.senderId === user?.id}
            receiverProfileImg={
              selectedConversation?.participants[0].profileImg
            }
          />
        </List.Item>
      )}
      style={{
        overflowY: "auto",
        flex: 1,
        marginBottom: "1rem",
        padding: "0 10px",
      }}
    >
      <div ref={messagesEndRef} />
    </List>
  );
};
