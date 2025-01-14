import { adminConversation } from "@/components/chat/adminConversation";
import { playNotification } from "@/services/playNotification";
import useUserStore from "@/store/useUserStore";
import {
  requestNotificationPermission,
  showBrowserNotification,
  updateTabTitle,
} from "@/services/notificationService";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";

import io, { Socket } from "socket.io-client";
import { Pagination } from "antd";

interface ISocketContext {
  socket: Socket | null;
  chatLoading: boolean;
  setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConversation: ConversationType | null;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<ConversationType | null>
  >;
  hasNotification: boolean;
  setHasNotification: React.Dispatch<React.SetStateAction<boolean>>;
  notificationContent: string;
  setNotificationContent: React.Dispatch<React.SetStateAction<string>>;
}

const ChatContext = createContext<ISocketContext | undefined>(undefined);

export const useChatContext = (): ISocketContext => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const socketURL = process.env.NEXT_PUBLIC_BASE_URL;

const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasNotification, setHasNotification] = useState<boolean>(false);
  const [notificationContent, setNotificationContent] = useState<string>("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const user = useUserStore((state) => state.user);
  // todo: fix infinite scroll, add seen messsage mark at message item
  useEffect(() => {
    if (user) {
      const socket = io(socketURL, {
        query: {
          userId: user.id,
        },
      });
      socketRef.current = socket;

      // Request notification permission when component mounts
      requestNotificationPermission();

      socket.on("onlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
      socket.on("notification", ({ content }) => {
        if (!isOpen) {
          playNotification();
          setHasNotification(true);
          setNotificationContent(content);
          // Show browser notification
          showBrowserNotification("New Message", content);
          // Update tab title
          updateTabTitle(true);
          setTimeout(() => {
            setNotificationContent("");
          }, 3000);
        }
      });
      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!user) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [user, isOpen]);

  // Reset tab title when chat is opened
  useEffect(() => {
    if (isOpen) {
      updateTabTitle(false);
    }
  }, [isOpen]);

  return (
    <ChatContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        chatLoading,
        setChatLoading,
        isOpen,
        setIsOpen,
        selectedConversation,
        setSelectedConversation,
        hasNotification,
        setHasNotification,
        notificationContent,
        setNotificationContent,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
