"use client";
import React from "react";
import Chat from "../chat";
import ChatContextProvider from "@/context/chatContext";

const ChatLayout = () => {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
};

export default ChatLayout;
