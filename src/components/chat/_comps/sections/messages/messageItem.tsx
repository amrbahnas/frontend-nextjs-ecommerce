import { Avatar, Image } from "antd";

import useUserStore from "@/store/useUserStore";
import dayjs from "dayjs";

interface MessageItemProps {
  message: MessageType;
  fromMe: boolean;
  receiverProfileImg: string;
}

export const MessageItem = ({
  message,
  fromMe,
  receiverProfileImg,
}: MessageItemProps) => {
  const user = useUserStore((state) => state.user);
  const messageBgColor =
    message.type === "text" ? (fromMe ? "#1890ff" : "#f0f0f0") : "transparent";
  const messageColor = fromMe ? "white" : "black";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: fromMe ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: "8px",
        width: "100%",
      }}
    >
      <Avatar src={fromMe ? user?.profileImg : receiverProfileImg} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: fromMe ? "flex-end" : "flex-start",
          maxWidth: "70%",
        }}
      >
        <div
          style={{
            padding: message.type === "text" ? "8px 12px" : "4px",
            borderRadius: "12px",
            backgroundColor: messageBgColor,
            color: messageColor,
            boxShadow:
              message.type === "text" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          {message.type === "text" ? (
            message.content
          ) : (
            <Image
              src={message.content}
              alt="Message image"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                height: "200px",
              }}
              preview={{
                mask: null,
                maskClassName: "custom-mask",
              }}
            />
          )}
        </div>
        <span
          style={{
            fontSize: "12px",
            color: "#999",
            marginTop: "4px",
          }}
        >
          {dayjs(message.createdAt).format("HH:mm")}
        </span>
      </div>
    </div>
  );
};
