const notificationSound = "/assets/notification.mp3";

export const playNotification = () => {
  const audio = new Audio(notificationSound);
  audio.play();
};
