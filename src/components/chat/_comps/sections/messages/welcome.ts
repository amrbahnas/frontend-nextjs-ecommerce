export const adminConversation = (lng: "en" | "ar") => {
  return {
    name: lng === "ar" ? "مدير المتجر" : "store Support",
    image: "/logo.png",
    userId: "675f43034eaf6ca5430de61b",
  } as ConversationType;
};

export const welcomeMessage = (lng: "en" | "ar") => {
  return {
    id: "0",
    content:
      lng === "ar"
        ? "مرحبا بك في المتجر كيف يمكننا مساعدتك؟"
        : "Welcome to store How can we help you?",
    senderId: "675f43034eaf6ca5430de61b",
    conversationId: "675f43034eaf6ca5430de61b",
    createdAt: new Date(),
    type: "text",
  } as MessageType;
};
