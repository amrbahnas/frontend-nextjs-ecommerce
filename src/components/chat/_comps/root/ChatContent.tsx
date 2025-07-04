"use client";
import { ArrowLeftOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { memo, useCallback } from "react";
import { ChatInput } from "../sections/chatInput";
import { ConversationsList } from "../sections/conversations";
import { ConversationHeader } from "../sections/conversations/conversationHeader";
import { MessageList } from "../sections/messages";

type Conversation = any; // Replace with your actual conversation type

interface ChatViewProps {
  selectedConversation: Conversation | null;
}

const UserView = memo(({ selectedConversation }: ChatViewProps) => {
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
});
UserView.displayName = "UserView";

interface AdminViewProps extends ChatViewProps {
  isLargeScreen: boolean;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

const AdminView = memo(
  ({
    isLargeScreen: lg,
    selectedConversation,
    setSelectedConversation,
  }: AdminViewProps) => {
    const handleBackClick = useCallback(() => {
      setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
      <>
        <div
          className={classNames("transition-all duration-300", {
            "w-[350px]": lg,
            "w-full": !lg && !selectedConversation,
            hidden: !lg && selectedConversation,
          })}
        >
          <ConversationsList />
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
AdminView.displayName = "AdminView";

interface ChatContentProps {
  isAdmin: boolean;
  isLargeScreen: boolean;
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

export const ChatContent = memo(
  ({
    isAdmin,
    isLargeScreen,
    selectedConversation,
    setSelectedConversation,
  }: ChatContentProps) => {
    if (!isAdmin) {
      return <UserView selectedConversation={selectedConversation} />;
    }

    return (
      <AdminView
        isLargeScreen={isLargeScreen}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
    );
  }
);

ChatContent.displayName = "ChatContent";
