import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, List } from "antd";
import classNames from "classnames";
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
              src={conversation?.image}
              icon={!conversation?.image && <UserOutlined />}
              size="large"
            />
            {onlineUsers.includes(conversation?.userId || "") && (
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
            <span>{conversation?.name}</span>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {dayjs(conversation?.lastMessage?.createdAt).format("hh:mm")}
            </span>
          </div>
        }
        description={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              className={classNames(
                "overflow-hidden text-sm truncate text-gray-400 max-w-[70%]",
                {
                  "!font-bold !text-black ": conversation?.lastMessage?.unread,
                }
              )}
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
