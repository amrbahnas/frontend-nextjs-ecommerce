import { Avatar, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Message } from "./types";
import dayjs from "dayjs";
import useUserStore from "@/store/useUserStore";

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
            backgroundColor: !fromMe ? "#f0f0f0" : "#1890ff",
            color: !fromMe ? "black" : "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
