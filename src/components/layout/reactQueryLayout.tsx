"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

const ReactQueryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default ReactQueryLayout;
