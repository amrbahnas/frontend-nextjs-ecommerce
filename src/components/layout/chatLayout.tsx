"use client";
import React from "react";
import Chat from "../chat";
import SocketContextProvider from "@/context/socketContext";

const ChatLayout = () => {
  return (
    <SocketContextProvider>
      <Chat />
    </SocketContextProvider>
  );
};

export default ChatLayout;
