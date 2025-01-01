import { useChatContext } from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { List } from "antd";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MessageItem } from "./MessageItem";
import { MessageListSkeleton } from "./MessageListSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

export const MessageList = () => {
  const [Renderedmessages, setMessages] = useState<MessageType[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const { socket, isOpen, selectedConversation } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const user = useUserStore((state) => state.user);
  const isInitialLoad = useRef(true);
  const firstMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (socket && selectedConversation) {
      setLoadingMessages(true);
      if (page === 1) {
        isInitialLoad.current = true;
      }
      socket.emit(
        "getMessages",
        { conversationId: selectedConversation.id, page, pageSize: 20 },
        ({ success, messages, error, hasMore }: any) => {
          if (success) {
            if (page === 1) {
              setMessages(messages);
              isInitialLoad.current = false;
            } else {
              const prevFirstMessage = Renderedmessages[0];
              setMessages((prev) => [...messages, ...prev]);

              // After state update, scroll to the previous first message
              setTimeout(() => {
                const messageElements = document.querySelectorAll(
                  ".chat-messages .ant-list-item"
                );
                const prevMessageIndex = messages.length;
                if (messageElements[prevMessageIndex]) {
                  messageElements[prevMessageIndex].scrollIntoView({
                    behavior: "auto",
                    block: "start",
                  });
                }
              }, 0);
            }
            setHasMore(hasMore);
          } else {
            toast.error(error);
          }
          setLoadingMessages(false);
        }
      );
    }
  }, [socket, selectedConversation, page]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message: MessageType) => {
        const messageConversationNotOpen =
          message.conversationId !== selectedConversation?.id;

        if ((isAdmin === true && messageConversationNotOpen) || !isOpen) {
          return;
        }
        socket.emit("markMessageAsRead", {
          messageId: message.id,
        });

        setMessages((prev) => [...prev, message]);
        if (!isInitialLoad.current) {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      });
      return () => {
        if (socket) {
          socket?.off("newMessage");
        }
      };
    }
  }, [socket, selectedConversation, isAdmin, isOpen]);

  if (loadingMessages && page === 1) {
    return <MessageListSkeleton />;
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={Renderedmessages.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center", padding: "10px" }}>
            Loading more messages...
          </div>
        }
        scrollableTarget="scrollableDiv"
        inverse={true}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        endMessage={
          <p className="text-center text-gray-400 mt-2 mb-4">
            You are all caught up!
          </p>
        }
      >
        <List
          className="chat-messages"
          itemLayout="horizontal"
          loading={false}
          dataSource={Renderedmessages}
          renderItem={(message, index) => (
            <List.Item
              key={message.id}
              ref={index === 0 ? firstMessageRef : null}
              style={{
                justifyContent:
                  message.senderId === user?.id ? "flex-end" : "flex-start",
                border: "none",
                padding: "8px 0",
              }}
            >
              <MessageItem
                message={message}
                fromMe={message.senderId === user?.id}
                receiverProfileImg={
                  selectedConversation?.participants[0].profileImg
                }
              />
            </List.Item>
          )}
          style={{
            padding: "0 10px",
          }}
        >
          <div ref={messagesEndRef} />
        </List>
      </InfiniteScroll>
    </div>
  );
};
