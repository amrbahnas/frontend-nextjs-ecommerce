import Image from "next/image";
import React from "react";

const NoData = () => {
  return (
    <div className="flex items-center justify-center w-full h-80">
      <Image
        src="No-data.svg"
        alt="No Data"
        className=" opacity-80"
        width={400}
        height={400}
      />
    </div>
  );
};

export default NoData;
