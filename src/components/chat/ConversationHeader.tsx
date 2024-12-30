import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";

interface ConversationHeaderProps {
  conversation: ConversationType | null;
}

export const ConversationHeader = ({
  conversation,
}: ConversationHeaderProps) => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (!isAdmin) return null;

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
          src={conversation?.user.profileImg}
          icon={!conversation?.user.profileImg && <UserOutlined />}
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
      <div>
        <div style={{ fontWeight: 500 }}>{conversation?.user.name}</div>
        {/* <div
          style={{
            fontSize: "12px",
            color: conversation.isOnline ? "#52c41a" : "#999",
          }}
        >
          {conversation.isOnline ? "Online" : "Offline"}
        </div> */}
      </div>
    </div>
  );
};
