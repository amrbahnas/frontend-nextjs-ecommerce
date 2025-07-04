import { useEffect, useRef, forwardRef, ForwardedRef } from "react";
import type { JSX } from "react";
import { Error } from "./error";
import RenderedCardsGrid from "./renderedCardsGrid";
import NoData from "./noData";
import { Spin } from "antd";

export const InfiniteScroll = forwardRef(InfiniteScrollComponent) as <T>(
  props: InfiniteScrollProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => JSX.Element;

function InfiniteScrollComponent<T>(
  {
    onLoadMore,
    threshold = 1000,
    reverse = false,
    loading,
    fetchingMoreLoading,
    hasMore,
    error,
    data,
    customColsNum,
    renderItem,
    skeketonItem,
    customNoData,
    className,
  }: InfiniteScrollProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const traggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          onLoadMore?.();
        }
      },
      {
        rootMargin: reverse
          ? `${threshold}px 0px 0px 0px` // For upward scrolling
          : `0px 0px ${threshold}px 0px`, // For downward scrolling
      }
    );

    const currentContainer = traggerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasMore]);

  if (loading && data?.length === 0)
    return (
      <RenderedCardsGrid length={5} customColsNum={customColsNum}>
        {[1, 2, 3, 4, 5].map((num: any) => (
          <div key={num}>{skeketonItem?.(num)}</div>
        ))}
      </RenderedCardsGrid>
    );

  if (error) return <Error error={error} />;
  if (data?.length === 0 && !loading) return customNoData ?? <NoData />;

  return (
    <div
      ref={forwardedRef}
      className={`overflow-y-auto h-full overflow-x-hidden  ${
        reverse ? "flex flex-col-reverse pt-2" : ""
      } ${className}`}
    >
      <RenderedCardsGrid
        customColsNum={customColsNum}
        length={data?.length ?? 0}
      >
        {data?.map((item: any) => (
          <div key={item?.id}>{renderItem?.(item)}</div>
        ))}
      </RenderedCardsGrid>
      {fetchingMoreLoading && <Loader />}
      {!hasMore && <NoMoreItems />}
      <div ref={traggerRef} className="h-1" />
    </div>
  );
}

const NoMoreItems = () => {
  return (
    <div className="text-center py-4  text-muted-foreground ">
      No more items to load
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <Spin />
    </div>
  );
};

interface InfiniteScrollProps<T> {
  onLoadMore: () => void;
  threshold?: number;
  reverse?: boolean;
  loading?: boolean;
  fetchingMoreLoading?: boolean;
  hasMore: boolean;
  error?: any;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  customColsNum?: number;
  skeketonItem?: (num: number) => React.ReactNode;
  customNoData?: React.ReactNode;
  className?: string;
}
