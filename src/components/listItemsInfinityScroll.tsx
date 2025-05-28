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
}: {
  data: T[];
  pagination: InfinitePaginationType;
  renderItem: (item: T) => React.ReactNode;
  isLoading: boolean;
  skeketonItem: (key: number) => React.ReactNode;
  customColsNum?: number;
  customNoData?: React.ReactNode;
  error?: any;
}) => {
  if (isLoading && data?.length === 0)
    return (
      <RenderedCardsGrid length={5} customColsNum={customColsNum}>
        {Array.from({ length: pagination?.pageSize || 5 }).map((num: any) =>
          skeketonItem(num)
        )}
      </RenderedCardsGrid>
    );

  if (data?.length === 0 && !isLoading) return customNoData ?? <NoData />;
  if (error) return <Error error={error} />;

  return (
    <InfiniteScroll
      onLoadMore={pagination?.hasMore ? pagination.fetchNextPage : undefined}
      threshold={500}
    >
      <RenderedCardsGrid customColsNum={customColsNum} length={data?.length}>
        {data?.map((item: T) => renderItem(item))}
      </RenderedCardsGrid>
      {pagination?.isFetchingNextPage && (
        <div className="flex justify-center items-center mt-4">
          <Spin />
        </div>
      )}
      {!pagination?.hasMore && data?.length > 5 && (
        <div className="text-center py-4 text-muted-foreground ">
          No more items to load
        </div>
      )}
    </InfiniteScroll>
  );
};

export default ListItemsInfinityScroll;
