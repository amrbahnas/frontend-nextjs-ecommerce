import { useChatContext } from "@/context/chatContext";
import useUserStore from "@/store/useUserStore";
import { List } from "antd";
import { useEffect, useState, useRef } from "react";
import { useGetMessages } from "./_api/query";
import { adminConversation } from "./adminConversation";
import { MessageItem } from "./MessageItem";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import { playNotification } from "@/services/playNotification";

interface MessageListProps {
  selectedConversation: ConversationType | null;
}

export const MessageList = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isOpen, selectedConversation } = useChatContext();
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const user = useUserStore((state) => state.user);
  const [Renderedmessages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      type: "text",
      content: "Hello! How can I help you today?",
      createdAt: new Date(),
      senderId: adminConversation.participants[0].id,
    },
  ]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: MessageType) => {
        const messageConversationNotOpen =
          message.conversationId !== selectedConversation?.id;

        if ((isAdmin === true && messageConversationNotOpen) || !isOpen) {
          return;
        }
        socket.emit("markMessageAsRead", {
          messageId: message.id,
        });
        setMessages((prev) => [...prev, message]);
      });
      socket.emit(
        "getMessages",
        {
          conversationId: selectedConversation?.id,
        },
        ({ success, messages, error }: any) => {
          if (success) {
            setMessages(messages);
          } else {
            toast.error(error);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
        socket.off("markMessageAsRead");
      }
    };
  }, [socket, selectedConversation, isOpen, isAdmin, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Renderedmessages]);

  return (
    <List
      className="chat-messages"
      itemLayout="horizontal"
      loading={false}
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
