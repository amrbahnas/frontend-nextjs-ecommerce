import { useSyncExternalStore } from "react";

const subscribeToOnlineStatus = (callback: any) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

const getOnlineSnapshot = (): boolean => {
  return navigator.onLine;
};

const getServerOnlineSnapshot = () => {
  return true;
};

const useOnlineStatus = () => {
  return useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineSnapshot,
    getServerOnlineSnapshot
  );
};

export default useOnlineStatus;
