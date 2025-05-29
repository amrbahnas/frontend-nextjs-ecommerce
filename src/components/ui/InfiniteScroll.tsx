import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  children: React.ReactNode;
  onLoadMore?: () => void;
  threshold?: number;
  reverse?: boolean;
};

export function InfiniteScroll({
  children,
  onLoadMore,
  threshold = 500,
  reverse = false,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          onLoadMore?.();
        }
      },
      {
        rootMargin: reverse
          ? `${threshold}px 0px 0px 0px` // For upward scrolling
          : `0px 0px ${threshold}px 0px`, // For downward scrolling
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [onLoadMore, threshold, reverse]);

  return (
    <div>
      {reverse && <div ref={containerRef} className="h-1" />}
      {children}
      {!reverse && <div ref={containerRef} className="h-1" />}
    </div>
  );
}
