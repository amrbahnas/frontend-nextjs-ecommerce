"use client";
import { memo } from "react";
import { FloatButton, Tooltip } from "antd";
import { MessageOutlined } from "@ant-design/icons";

interface ChatTriggerProps {
  onOpenChat: () => void;
  hasNotification: boolean;
  notificationContent: string;
}

export const ChatTrigger = memo(
  ({ onOpenChat, hasNotification, notificationContent }: ChatTriggerProps) => (
    <Tooltip
      open={!!notificationContent}
      title={notificationContent}
      placement="left"
      color="blue"
    >
      <FloatButton
        onClick={onOpenChat}
        shape="circle"
        tooltip={notificationContent ? "" : "Chat Support"}
        type="primary"
        badge={{
          count: hasNotification ? "!" : 0,
          offset: [0, 5],
        }}
        icon={<MessageOutlined className="!text-white" />}
        className="!w-16 !h-16 !z-50"
      />
    </Tooltip>
  )
);

ChatTrigger.displayName = "ChatTrigger";
