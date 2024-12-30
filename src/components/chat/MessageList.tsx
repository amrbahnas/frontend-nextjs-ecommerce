import { List } from "antd";
import { Message } from "./types";
import { MessageItem } from "./MessageItem";
import { useState } from "react";
import { useGetMessages } from "./_api/query";
import useUserStore from "@/store/useUserStore";

interface MessageListProps {
  selectedConversation: ConversationType | null;
}

export const MessageList = ({ selectedConversation }: MessageListProps) => {
  const { messages } = useGetMessages(selectedConversation?.user.id);
  const user = useUserStore((state) => state.user);
  console.log("🚀 ~ file: MessageList.tsx:13 ~ messages:", messages);
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: "1",
  //     type: "text",
  //     content: "Hello! How can I help you today?",
  //     isAdmin: true,
  //     timestamp: new Date().toLocaleTimeString(),
  //   },
  // ]);

  return (
    <List
      className="chat-messages"
      itemLayout="horizontal"
      dataSource={messages}
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
            receiverProfileImg={selectedConversation?.user.profileImg}
          />
        </List.Item>
      )}
      style={{
        overflowY: "auto",
        flex: 1,
        marginBottom: "1rem",
        padding: "0 10px",
      }}
    />
  );
};
