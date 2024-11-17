"use client";
import useOnlineStatus from "@/hooks/global/useOnlineStatus";
import classnames from "classnames";
import React from "react";
import OfflineModal from "../offlineModal";

const OnlineStatus: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isOnline = useOnlineStatus();
  return (
    <div>
      <div className={classnames({ "grayscale-[100%]": !isOnline })}>
        {children}
      </div>
      <OfflineModal onlineStatus={isOnline} />
    </div>
  );
};

export default OnlineStatus;
