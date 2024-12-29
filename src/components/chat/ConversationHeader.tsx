import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Conversation } from "./ConversationTypes";

interface ConversationHeaderProps {
  conversation: Conversation;
}

export const ConversationHeader = ({
  conversation,
}: ConversationHeaderProps) => {
  return (
    <div
      style={{
        padding: "15.5px 16px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ position: "relative" }}>
        <Avatar
          src={conversation.userImage}
          icon={!conversation.userImage && <UserOutlined />}
          size="large"
        />
        {conversation.isOnline && (
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
        <div style={{ fontWeight: 500 }}>{conversation.userName}</div>
        <div
          style={{
            fontSize: "12px",
            color: conversation.isOnline ? "#52c41a" : "#999",
          }}
        >
          {conversation.isOnline ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};
