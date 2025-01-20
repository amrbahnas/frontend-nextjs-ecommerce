"use client";
import React from "react";
import Chat from "../chat";
import ChatContextProvider from "@/context/chatContext";
import useAuthStore from "@/store/useAuthStore";

const ChatLayout = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  if (!isLogin) return null;
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
};

export default ChatLayout;
