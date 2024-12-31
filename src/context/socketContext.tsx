import useUserStore from "@/store/useUserStore";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";

import io, { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  chatLoading: boolean;
  setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onlineUsers: string[];
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const socketURL = process.env.NEXT_PUBLIC_BASE_URL;

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      const socket = io(socketURL, {
        query: {
          userId: user.id,
        },
      });
      socketRef.current = socket;

      socket.on("onlineUsers", (users: string[]) => {
        setOnlineUsers(users);
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
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        chatLoading,
        setChatLoading,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
