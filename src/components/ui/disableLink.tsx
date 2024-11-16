import { useRouter } from "next/navigation";
import React from "react";
import classnames from "classnames";
const DisableLink = ({
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
      className={classnames(
        "cursor-pointer",
        { "cursor-auto": disabled },
        className
      )}
      onClick={() => {
        if (disabled) return;
        router.push(href);
      }}
    >
      {children}
    </div>
  );
};

export default DisableLink;
