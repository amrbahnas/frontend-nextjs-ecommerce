import { InfiniteScroll } from "@/components/ui/InfiniteScroll";
import useUserStore from "@/store/useUserStore";
import { Badge } from "antd";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import { useGetProductReviews } from "../../_api/query";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import ReviewsSkeleton from "./reviews.skeleton";

const Reviews = ({ productId }: { productId: string }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const { error, isLoading, refetch, reviews, pagination } =
    useGetProductReviews(productId, !inView);
  const user = useUserStore((state) => state.user);
  const t = useTranslations("Reviews");

  return (
    <div className="min-h-[200px]" ref={ref}>
      {inView && (
        <>
          <h1 className="text-2xl mb-4">
            {t("userReviews")}
            <Badge
              count={reviews?.length}
              className="!ml-2"
              showZero
              color="#9ca3af"
            />
          </h1>

          <div className=" space-y-6 ">
            <div className="  max-h-96 overflow-auto">
              <InfiniteScroll<ReviewType>
                data={reviews}
                fetchingMoreLoading={pagination.isFetchingNextPage}
                renderItem={(review) => (
                  <ReviewCard
                    review={review}
                    key={review.id}
                    currentUser={user}
                    refetch={refetch}
                  />
                )}
                onLoadMore={pagination.fetchNextPage}
                hasMore={pagination?.hasMore}
                loading={isLoading}
                customColsNum={1}
                customNoData={<p>Be the first to review this product</p>}
                skeketonItem={(key) => <ReviewsSkeleton key={key} />}
              />
            </div>
            <ReviewForm productId={productId} customOnSuccess={refetch} />
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
