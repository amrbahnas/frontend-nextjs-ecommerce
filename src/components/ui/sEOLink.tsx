import Link from "next/link";
import { ReactNode } from "react";

interface SEOLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  prefetch?: boolean;
  isExternal?: boolean;
}

const SEOLink = ({
  href,
  children,
  className,
  title,
  prefetch = false,
  isExternal = false,
}: SEOLinkProps) => {
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      title={title}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

export default SEOLink;
