import useUserStore from "@/store/useUserStore";
import { useGetProductReviews } from "../../_api/query";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import { Badge, Divider } from "antd";
import ReviewsSkeleton from "./reviews.skeleton";
import { Error } from "@/components/ui/error";
import { useTranslations } from "next-intl";

const Reviews = ({ productId }: { productId: string }) => {
  const { error, isLoading, refetch, reviews } =
    useGetProductReviews(productId);
  console.log("🚀 ~ file: index.tsx:12 ~ reviews:", reviews);
  const user = useUserStore((state) => state.user);
  const t = useTranslations("Reviews");

  if (isLoading) return <ReviewsSkeleton />;

  return (
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
        <Divider />
        <ReviewForm productId={productId} customOnSuccess={refetch} />
      </div>
    </>
  );
};

export default Reviews;
