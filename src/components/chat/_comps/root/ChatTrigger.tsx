"use client";
import { memo } from "react";
import { FloatButton, Tooltip } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

interface ChatTriggerProps {
  onOpenChat: () => void;
  hasNotification: boolean;
  notificationContent: string;
}

export const ChatTrigger = memo(
  ({ onOpenChat, hasNotification, notificationContent }: ChatTriggerProps) => {
    const t = useTranslations("chat");

    return (
      <Tooltip
        open={!!notificationContent}
        title={notificationContent}
        placement="right"
        color="blue"
      >
        <FloatButton
          onClick={onOpenChat}
          shape="circle"
          // tooltip={notificationContent ? "" : t("trigger.tooltip")}
          type="primary"
          badge={{
            count: hasNotification ? "!" : 0,
            offset: [0, 5],
          }}
          icon={<MessageOutlined className="!text-white" />}
          className="!w-16 !h-16 !z-50"
        />
      </Tooltip>
    );
  }
);

ChatTrigger.displayName = "ChatTrigger";
