import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";
import { useChatContext } from "@/context/chatContext";

export const ConversationHeader = () => {
  const { onlineUsers, selectedConversation } = useChatContext();

  const isOnline = onlineUsers.includes(selectedConversation?.userId || "");

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
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};
