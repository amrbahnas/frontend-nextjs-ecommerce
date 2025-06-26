import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { FaImage } from "react-icons/fa";

const ConversationItem = ({
  conversation,
  handleSelectConversation,
  selectedConversation,
  isOnline,
}: {
  conversation: ConversationType;
  handleSelectConversation: (conversation: ConversationType) => void;
  selectedConversation: ConversationType | null;
  isOnline: boolean;
}) => {
  return (
    <div
      onClick={() => handleSelectConversation(conversation)}
      className={`p-3 cursor-pointer flex items-center border-b border-[#f0f0f0] transition-colors duration-300 hover:!bg-[rgba(0,0,0,0.04)] ${
        selectedConversation?.id === conversation.id
          ? "bg-[rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center flex-1">
        <div style={{ position: "relative" }}>
          <Avatar
            src={conversation?.image}
            icon={!conversation?.image && <UserOutlined />}
            size="large"
          />
          {isOnline && (
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
        <div className="ml-4 flex-1">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{conversation?.name}</span>
            <span style={{ fontSize: "12px", color: "#999" }}>
              {dayjs(conversation?.lastMessage?.createdAt).format("hh:mm")}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              className={classNames(
                "overflow-hidden text-sm truncate text-gray-400 max-w-[70%]",
                {
                  "!font-bold !text-black": conversation?.lastMessage?.unread,
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
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
