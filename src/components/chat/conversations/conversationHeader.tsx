import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";
import { useChatContext } from "@/context/chatContext";
import dayjs from "dayjs";
import { useEffect } from "react";

export const ConversationHeader = () => {
  const { onlineUsers, selectedConversation, setSelectedConversation, socket } =
    useChatContext();
  const isOnline = onlineUsers.includes(selectedConversation?.userId || "");

  useEffect(() => {
    if (socket && selectedConversation) {
      socket.on("updateuserLastSeen", (userId) => {
        if (userId === selectedConversation?.userId) {
          setSelectedConversation((prev) => ({
            ...prev,
            lastSeen: new Date(),
          }));
        }
      });
      return () => {
        socket.off("updateuserLastSeen");
      };
    }
  }, [socket, selectedConversation]);

  return (
    <div
      style={{
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#fff",
      }}
      className="pb-2 px-2"
    >
      <div style={{ position: "relative" }}>
        <Avatar
          src={selectedConversation?.image}
          icon={!selectedConversation?.image && <UserOutlined />}
          size="large"
        />
        {isOnline && (
          <Badge
            status="success"
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
            }}
          />
        )}
      </div>
      <div>
        <div style={{ fontWeight: 500 }}>{selectedConversation?.name}</div>
        <div
          style={{
            fontSize: "12px",
            color: isOnline ? "#52c41a" : "#999",
          }}
        >
          {isOnline
            ? "Online"
            : selectedConversation?.lastSeen
            ? dayjs(selectedConversation?.lastSeen).fromNow()
            : "Offline"}
        </div>
      </div>
    </div>
  );
};
