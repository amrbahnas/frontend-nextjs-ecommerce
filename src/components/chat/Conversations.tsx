import { List, Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Conversation } from "./ConversationTypes";

interface ConversationsProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedId?: string;
}

export const Conversations = ({
  conversations,
  onSelectConversation,
  selectedId,
}: ConversationsProps) => {
  return (
    <List
      className="conversations-list"
      itemLayout="horizontal"
      dataSource={conversations}
      renderItem={(conversation) => (
        <List.Item
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          style={{
            padding: "12px 16px",
            cursor: "pointer",
            backgroundColor:
              selectedId === conversation.id
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
            }
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{conversation.userName}</span>
                <span style={{ fontSize: "12px", color: "#999" }}>
                  {conversation.timestamp}
                </span>
              </div>
            }
            description={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    color: "#666",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "70%",
                  }}
                >
                  {conversation.lastMessage}
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
  );
};
