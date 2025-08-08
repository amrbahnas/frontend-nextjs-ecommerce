import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";
import { useChatContext } from "@/context/chatContext";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export const MessagesHeader = () => {
  const t = useTranslations("chat");
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
    <section className="w-full flex items-center gap-2  transition-colors duration-200">
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
            ? t("conversation.status.online")
            : selectedConversation?.lastSeen
            ? dayjs(selectedConversation?.lastSeen).fromNow()
            : t("conversation.status.offline")}
        </div>
      </div>
    </section>
  );
};
