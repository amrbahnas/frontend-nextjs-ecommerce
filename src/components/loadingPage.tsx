import Image from "next/image";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col relative">
      <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-l-2 border-lama absolute"></div>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
    </div>
  );
};

export default LoadingPage;
