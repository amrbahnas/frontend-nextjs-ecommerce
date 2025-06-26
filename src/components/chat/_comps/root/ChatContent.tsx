"use client";
import { memo, useCallback } from "react";
import classNames from "classnames";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConversationHeader } from "../sections/conversations/conversationHeader";
import { ConversationsList } from "../sections/conversations";
import { MessageList } from "../sections/messages";
import { ChatInput } from "../sections/chatInput";

type Conversation = any; // Replace with your actual conversation type

interface ChatContentProps {
  isAdmin: boolean;
  isLargeScreen: boolean;
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

export const ChatContent = memo(
  ({
    isAdmin,
    isLargeScreen: lg,
    selectedConversation,
    setSelectedConversation,
  }: ChatContentProps) => {
    const handleBackClick = useCallback(() => {
      setSelectedConversation(null);
    }, [setSelectedConversation]);

    if (!isAdmin) {
      return (
        <div className="w-full flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="flex-1 overflow-y-auto">
                <MessageList />
              </div>
              <ChatInput />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <div
          className={classNames("transition-all duration-300", {
            "w-[350px]": lg,
            "w-full": !lg && !selectedConversation,
            hidden: !lg && selectedConversation,
          })}
        >
          <div className="h-full overflow-y-auto">
            <ConversationsList />
          </div>
        </div>
        <div
          className={classNames(
            "flex-1 lg:w-[350px] flex flex-col transition-all duration-300",
            {
              block: lg || selectedConversation,
              hidden: !lg && !selectedConversation,
            }
          )}
        >
          {selectedConversation ? (
            <>
              {isAdmin && (
                <div className="flex items-center pb-2 px-2 gap-2">
                  {!lg && (
                    <button
                      onClick={handleBackClick}
                      className="hover:bg-gray-100 rounded-full"
                    >
                      <ArrowLeftOutlined />
                    </button>
                  )}
                  <ConversationHeader />
                </div>
              )}
              <div className="flex-1 overflow-y-auto">
                <MessageList />
              </div>
              <ChatInput />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </>
    );
  }
);

ChatContent.displayName = "ChatContent";
