import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, List } from "antd";
import dayjs from "dayjs";
import { FaImage } from "react-icons/fa";

const ConversationItem = ({
  conversation,
  handleSelectConversation,
  selectedConversation,
  onlineUsers,
}: {
  conversation: ConversationType;
  handleSelectConversation: (conversation: ConversationType) => void;
  selectedConversation: ConversationType | null;
  onlineUsers: string[];
}) => {
  return (
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
                !conversation.participants[0].profileImg && <UserOutlined />
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{conversation.participants[0].name}</span>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {dayjs(conversation.lastMessage?.createdAt).format("hh:mm")}
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
  );
};

export default ConversationItem;
