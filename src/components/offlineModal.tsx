import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { RiWifiOffLine } from "react-icons/ri";

const OfflineModal = () => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div className="fixed   h-[100dvh]  inset-0  text-white bg-black/80 flex justify-center items-center flex-col gap-2 z-50">
      <RiWifiOffLine size={50} />
      <h3 className="text-2xl font-semibold">
        Your device appears to be offline.
      </h3>
      <p className="text-xs">
        Please check your internet connection and try again.
      </p>
      <button
        onClick={() => setVisible(false)}
        className=" px-4 py-2 rounded-md fixed top-4 right-4 "
      >
        <CgClose />
      </button>
    </div>
  );
};

export default OfflineModal;
