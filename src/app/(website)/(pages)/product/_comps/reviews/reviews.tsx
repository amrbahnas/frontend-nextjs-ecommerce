import useUserStore from "@/store/useUserStore";
import { useGetProductReviews } from "../../_api/query";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import { Badge, Divider } from "antd";
import ReviewsSkeleton from "./reviews.skeleton";
import { Error } from "@/components/ui/error";

const Reviews = ({ productId }: { productId: string }) => {
  const { error, isLoading, refetch, reviews } =
    useGetProductReviews(productId);
  const user = useUserStore((state) => state.user);

  if (isLoading) return <ReviewsSkeleton />;

  return (
    <>
      <h1 className="text-2xl">
        User Reviews
        <Badge
          count={reviews?.length}
          className="!ml-2"
          showZero
          style={{ backgroundColor: "#52c41a" }}
        />
      </h1>
      <Error error={error} />
      <div className=" space-y-6 ">
        <ReviewForm productId={productId} customOnSuccess={refetch} />
        <Divider />
        <div className=" flex flex-col gap-4 max-h-96 overflow-scroll">
          {reviews?.length === 0 && <p>No reviews yet</p>}
          {reviews?.map((review: ReviewType) => (
            <ReviewCard
              review={review}
              key={review._id}
              currentUser={user}
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
