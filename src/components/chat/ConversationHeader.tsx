import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";
import { useChatContext } from "@/context/chatContext";

export const ConversationHeader = () => {
  const { onlineUsers, selectedConversation } = useChatContext();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  const isOnline = onlineUsers.includes(
    selectedConversation?.participants[0].id
  );

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
          src={selectedConversation?.participants[0].profileImg}
          icon={
            !selectedConversation?.participants[0].profileImg && (
              <UserOutlined />
            )
          }
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
        <div style={{ fontWeight: 500 }}>
          {selectedConversation?.participants[0].name}
        </div>
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
