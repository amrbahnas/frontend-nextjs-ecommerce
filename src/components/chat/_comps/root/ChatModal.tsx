"use client";
import { memo } from "react";
import { Modal } from "antd";
import classNames from "classnames";
import useAuthStore from "@/store/useAuthStore";
import { ConversationHeader } from "../sections/conversations/conversationHeader";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslations } from "next-intl";

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  isLargeScreen: boolean;
  children: React.ReactNode;
};

export const ChatModal = memo(
  ({
    isOpen,
    onClose,
    isFullScreen,
    toggleFullScreen,
    isLargeScreen: lg,
    children,
  }: ChatModalProps) => {
    const t = useTranslations("chat");
    const isAdmin = useAuthStore.getState().isAdmin;
    const isRTL = document.dir === "rtl";

    return (
      <Modal
        title={
          <span>
            {isAdmin ? t("modal.title.admin") : <ConversationHeader />}
          </span>
        }
        open={isOpen}
        onCancel={onClose}
        closeIcon={
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 pe-4"
          >
            {lg && (
              <div
                onClick={toggleFullScreen}
                className="border-none bg-transparent cursor-pointer hover:text-blue-500 p-1"
              >
                {isFullScreen ? (
                  <FullscreenExitOutlined className="text-gray-400" />
                ) : (
                  <FullscreenOutlined className="text-gray-400" />
                )}
              </div>
            )}
            <CloseOutlined
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-red-500"
            />
          </div>
        }
        destroyOnHidden
        footer={null}
        className={classNames(
          {
            "!w-screen !h-screen !top-4": isFullScreen || !lg,
            [`!w-auto !fixed sm:!bottom-24 ${
              isRTL ? "sm:!left-8" : "sm:!right-8"
            } !m-0 !p-0 sm:!top-auto`]: !isFullScreen && lg,
          },
          "[&_.ant-modal-close:hover]:!bg-transparent",
          "[&_.ant-modal-close:hover]:!text-gray-400"
        )}
        styles={{
          content: { paddingBottom: 0 },
          wrapper: { overflow: "hidden" },
          mask: { direction: isRTL ? "rtl" : "ltr" },
          body: { direction: isRTL ? "rtl" : "ltr" },
        }}
        modalRender={(modal) => (
          <div
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              direction: isRTL ? "rtl" : "ltr",
            }}
            className={classNames("overflow-hidden rounded-lg", {
              "!rounded-none": isFullScreen || !lg,
            })}
          >
            {modal}
          </div>
        )}
        mask={isFullScreen || !lg}
        maskClosable={true}
      >
        <div
          className={classNames("flex mt-2", {
            "h-[calc(100dvh-100px)]": isFullScreen || !lg,
            "h-[500px]": !isFullScreen && lg,
          })}
        >
          {children}
        </div>
      </Modal>
    );
  }
);

ChatModal.displayName = "ChatModal";
