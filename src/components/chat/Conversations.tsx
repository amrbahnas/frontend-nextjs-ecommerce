import useAuthStore from "@/store/useAuthStore";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, List } from "antd";
import { useGetAllConversations } from "./_api/query";
import dayjs from "dayjs";

interface ConversationsProps {
  onSelectConversation: (conversation: ConversationType) => void;
  selectedId?: string;
}

export const Conversations = ({
  onSelectConversation,
  selectedId,
}: ConversationsProps) => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const { conversations } = useGetAllConversations({
    skip: !isAdmin,
  });

  if (!isAdmin) return null;
  return (
    <div style={{ width: "300px" }}>
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
                    src={conversation.user.profileImg}
                    icon={!conversation.user.profileImg && <UserOutlined />}
                    size="large"
                  />
                  {/* {conversation.isOnline && (
                  <Badge
                    status="success"
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                    }}
                  />
                )} */}
                </div>
              }
              title={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{conversation.user.name}</span>
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
                    {conversation.lastMessage?.content}
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
