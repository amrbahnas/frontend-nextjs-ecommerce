const notificationSound = "/assets/notification.mp3";

//The audio doesn't work initially because browsers have a policy that requires user interaction before playing audio.
//The notification sound should work after the user's first interaction with  site
export const playNotification = () => {
  const audio = new Audio(notificationSound);
  audio.play();
};
