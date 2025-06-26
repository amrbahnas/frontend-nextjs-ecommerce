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
  }: ChatModalProps) => (
    <Modal
      title={
        <span>
          {useAuthStore.getState().isAdmin ? (
            "Chat Support"
          ) : (
            <ConversationHeader />
          )}
        </span>
      }
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      closeIcon={
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 pr-4"
        >
          {lg && (
            <button
              onClick={toggleFullScreen}
              className="border-none bg-transparent cursor-pointer hover:text-blue-500 p-1"
            >
              {isFullScreen ? (
                <FullscreenExitOutlined className="text-gray-400" />
              ) : (
                <FullscreenOutlined className="text-gray-400" />
              )}
            </button>
          )}
          <CloseOutlined
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-red-500"
          />
        </div>
      }
      destroyOnClose
      footer={null}
      className={classNames(
        {
          "!w-screen !h-screen !top-4": isFullScreen || !lg,
          "!w-auto !fixed sm:!bottom-24 sm:!right-8 !m-0 !p-0 sm:!top-auto":
            !isFullScreen && lg,
        },
        "[&_.ant-modal-close:hover]:!bg-transparent",
        "[&_.ant-modal-close:hover]:!text-gray-400"
      )}
      styles={{
        content: { paddingBottom: 0 },
        wrapper: { overflow: "hidden" },
      }}
      modalRender={(modal) => (
        <div
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
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
          "h-[calc(100svh-100px)]": isFullScreen || !lg,
          "h-[500px]": !isFullScreen && lg,
        })}
      >
        {children}
      </div>
    </Modal>
  )
);

ChatModal.displayName = "ChatModal";
