import Link from "next/link";
import { useState } from "react";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  prefetchOnHover?: boolean;
  prefetchOnVisible?: boolean;
  className?: string;
}

export function SmartLink({
  href,
  children,
  prefetchOnHover = false,
  prefetchOnVisible = false,
  className,
}: SmartLinkProps) {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  const handleMouseEnter = () => {
    if (prefetchOnHover) {
      setShouldPrefetch(true);
    }
  };

  return (
    <Link
      href={href}
      prefetch={shouldPrefetch}
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </Link>
  );
}
