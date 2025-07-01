import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  prefetchOnHover?: boolean;
  prefetchOnVisible?: boolean;
  className?: string;
}
// prefetch is automatic true case production env , that comp used for control it
export function SmartLink({
  href,
  children,
  prefetchOnHover = false,
  prefetchOnVisible = false,
  className,
}: SmartLinkProps) {
  const { isInView, ref } = useInView();
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  const handleMouseEnter = () => {
    if (prefetchOnHover) {
      setShouldPrefetch(true);
    }
  };

  useEffect(() => {
    if (isInView && prefetchOnVisible) {
      setShouldPrefetch(true);
    }
  }, [isInView]);

  return (
    <Link
      href={href}
      ref={ref as RefObject<HTMLAnchorElement | null>}
      prefetch={shouldPrefetch}
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </Link>
  );
}
