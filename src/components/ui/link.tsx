import { useRouter } from "next/navigation";
import React from "react";

const Link = ({
  className,
  href,
  children,
  disabled,
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      className={` cursor-pointer ${className}`}
      onClick={() => {
        if (disabled) return;
        router.push(href);
      }}
    >
      {children}
    </div>
  );
};

export default Link;
