import useBreakPoints from "@/hooks/global/userBreakPoints";
import Image from "next/image";
import React from "react";

const NoData = () => {
  const lg = useBreakPoints("lg");
  return (
    <div className="flex items-center justify-center w-full h-80">
      <Image
        src="No-data.svg"
        alt="No Data"
        className=" opacity-80"
        width={lg ? 400 : 300}
        height={lg ? 400 : 300}
      />
    </div>
  );
};

export default NoData;
