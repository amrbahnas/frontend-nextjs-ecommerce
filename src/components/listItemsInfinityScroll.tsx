import { Spin } from "antd";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import NoData from "./ui/noData";
import RenderedCardsGrid from "./ui/renderedCardsGrid";
import { Error } from "./ui/error";

const ListItemsInfinityScroll = <T,>({
  data,
  pagination,
  renderItem,
  skeketonItem,
  isLoading,
  customColsNum,
  customNoData,
  error,
  reverse = false,
  threshold = 500,
}: {
  data: T[];
  pagination: InfinitePaginationType;
  renderItem: (item: T) => React.ReactNode;
  isLoading: boolean;
  skeketonItem: (key: number) => React.ReactNode;
  customColsNum?: number;
  customNoData?: React.ReactNode;
  error?: any;
  reverse?: boolean;
  threshold?: number;
}) => {
  if (isLoading && data?.length === 0)
    return (
      <RenderedCardsGrid length={5} customColsNum={customColsNum}>
        {[1, 2, 3, 4, 5].map((num: any) => (
          <div key={num}>{skeketonItem(num)}</div>
        ))}
      </RenderedCardsGrid>
    );

  const NoMoreItems = () => {
    if (!pagination?.hasMore && data?.length > 5) {
      return (
        <div className="text-center py-4 text-muted-foreground ">
          No more items to load
        </div>
      );
    }
    return null;
  };

  const Loader = () => {
    if (pagination?.isFetchingNextPage) {
      return (
        <div className="flex justify-center items-center mt-4">
          <Spin />
        </div>
      );
    }
    return null;
  };

  if (data?.length === 0 && !isLoading) return customNoData ?? <NoData />;
  if (error) return <Error error={error} />;

  return (
    <InfiniteScroll
      onLoadMore={pagination?.hasMore ? pagination.fetchNextPage : undefined}
      threshold={threshold}
      reverse={reverse}
    >
      {reverse && (
        <>
          <Loader />
          <NoMoreItems />
        </>
      )}
      <RenderedCardsGrid customColsNum={customColsNum} length={data?.length}>
        {data?.map((item: any) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
      </RenderedCardsGrid>
      {!reverse && (
        <>
          <Loader />
          <NoMoreItems />
        </>
      )}
    </InfiniteScroll>
  );
};

export default ListItemsInfinityScroll;
