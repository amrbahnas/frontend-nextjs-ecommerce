let originalTitle = document.title;

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

export const showBrowserNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/logo.png",
    });
  }
};

export const updateTabTitle = (newMessage: boolean) => {
  if (newMessage) {
    if (!document.title.startsWith("(New Message)")) {
      originalTitle = document.title;
      document.title = `(New Message) ${originalTitle}`;
    }
  } else {
    document.title = originalTitle;
  }
};
