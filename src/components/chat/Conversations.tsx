import { useChatContext } from "@/context/chatContext";
import { playNotification } from "@/services/playNotification";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, List } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";

export const Conversations = () => {
  const { onlineUsers, socket, selectedConversation, setSelectedConversation } =
    useChatContext();
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [renderedConversations, setRenderedConversations] = useState<
    ConversationType[]
  >([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (socket && isAdmin) {
      socket.emit(
        "getConversations",
        {},
        ({ success, error, conversations }: any) => {
          if (success) {
            setRenderedConversations(conversations);
          } else {
            toast.error(error);
          }
        }
      );
      socket?.on(
        "updateConversationLastMessage",
        (message: lastMessageType) => {
          if (message.conversationId === selectedConversation?.id) {
            updateLastMessage(message);
          } else {
            updateLastMessage(message);
            increaseUnreadCount(message.conversationId);
          }
        }
      );
    }
    return () => {
      if (socket) {
        socket?.off("newMessage");
        socket?.off("getConversations");
        socket?.off("updateConversationLastMessage");
      }
    };
  }, [socket, selectedConversation, isAdmin, user]);

  const updateLastMessage = (message: lastMessageType) => {
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message }
          : conv
      )
    );
  };

  const increaseUnreadCount = (conversationId: string) => {
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, unreadCount: (conv?.unreadCount || 0) + 1 }
          : conv
      )
    );
  };

  const handleResetConversationReadCount = (
    conversationId: string | undefined
  ) => {
    if (!conversationId) return;
    setRenderedConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSelectConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    socket?.emit(
      "markConversationAsRead",
      { conversationId: conversation.id },
      () => {
        handleResetConversationReadCount(conversation.id);
      }
    );
  };

  if (!isAdmin) return null;
  return (
    <div style={{ width: "300px" }}>
      <List
        className="conversations-list"
        itemLayout="horizontal"
        dataSource={renderedConversations}
        renderItem={(conversation) => (
          <List.Item
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation)}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              backgroundColor:
                selectedConversation?.id === conversation.id
                  ? "rgba(0, 0, 0, 0.02)"
                  : "transparent",
              transition: "background-color 0.3s",
              borderBottom: "1px solid #f0f0f0",
            }}
            className="hover:!bg-[rgba(0,0,0,0.04)]"
          >
            <List.Item.Meta
              avatar={
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={conversation.participants[0].profileImg}
                    icon={
                      !conversation.participants[0].profileImg && (
                        <UserOutlined />
                      )
                    }
                    size="large"
                  />
                  {onlineUsers.includes(conversation.participants[0].id) && (
                    <Badge
                      status="success"
                      className="absolute bottom-2 right-2 "
                      styles={{
                        indicator: {
                          width: "8px",
                          height: "8px",
                        },
                      }}
                    />
                  )}
                </div>
              }
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{conversation.participants[0].name}</span>
                  <span style={{ fontSize: "12px", color: "#999" }}>
                    {dayjs(conversation.lastMessage?.createdAt).format("hh:mm")}
                  </span>
                </div>
              }
              description={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      color: "#666",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "70%",
                    }}
                  >
                    {conversation?.lastMessage?.type === "text" ? (
                      conversation.lastMessage?.content
                    ) : (
                      <FaImage size={24} />
                    )}
                  </span>
                  {conversation.unreadCount ? (
                    <Badge
                      count={conversation.unreadCount}
                      style={{
                        backgroundColor: "#1890ff",
                        marginLeft: "8px",
                      }}
                    />
                  ) : null}
                </div>
              }
            />
          </List.Item>
        )}
        style={{
          height: "100%",
          overflowY: "auto",
          borderRight: "1px solid #f0f0f0",
        }}
      />
    </div>
  );
};
