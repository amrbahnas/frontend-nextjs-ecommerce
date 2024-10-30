import useUserStore from "@/store/useUserStore";
import { useGetProductReviews } from "../../_api/query";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";
import { Divider } from "antd";

const Reviews = ({ productId }: { productId: string }) => {
  const { error, isError, isLoading, refetch, reviews } =
    useGetProductReviews(productId);

  const user = useUserStore((state) => state.user);

  return (
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
  );
};

export default Reviews;
