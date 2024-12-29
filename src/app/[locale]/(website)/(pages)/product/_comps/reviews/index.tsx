import useUserStore from "@/store/useUserStore";
import { useGetProductReviews } from "../../_api/query";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import { Badge, Divider } from "antd";
import ReviewsSkeleton from "./reviews.skeleton";
import { Error } from "@/components/ui/error";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const Reviews = ({ productId }: { productId: string }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "50px",
  });
  const { error, isLoading, refetch, reviews } = useGetProductReviews(
    productId,
    !inView
  );

  const user = useUserStore((state) => state.user);
  const t = useTranslations("Reviews");

  if (isLoading) return <ReviewsSkeleton />;

  return (
    <div ref={ref}>
      {inView && (
        <>
          <h1 className="text-2xl">
            {t("userReviews")}
            <Badge
              count={reviews?.length}
              className="!ml-2"
              showZero
              color="#9ca3af"
            />
          </h1>
          <Error error={error} />
          <div className=" space-y-6 ">
            <div className=" flex flex-col gap-4 max-h-96 overflow-scroll">
              {reviews?.length === 0 && <p>{t("noReviews")}</p>}
              {reviews?.map((review: ReviewType) => (
                <ReviewCard
                  review={review}
                  key={review.id}
                  currentUser={user}
                  refetch={refetch}
                />
              ))}
            </div>

            <ReviewForm productId={productId} customOnSuccess={refetch} />
          </div>
        </>
      )}
    </div>
  );
};

export default Reviews;
