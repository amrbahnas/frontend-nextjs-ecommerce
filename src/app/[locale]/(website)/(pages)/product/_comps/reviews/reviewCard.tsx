import NextImage from "@/components/ui/nextImage";
import { Rate } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import ReviewCardActions from "./reviewCardActions";
import { useTranslations } from "next-intl";
dayjs.extend(relativeTime);
dayjs.locale("ar");

const ReviewCard = ({
  review,
  currentUser,
  refetch,
}: {
  review: ReviewType;
  currentUser: User | null;
  refetch: () => void;
}) => {
  const t = useTranslations("Reviews");
  if (!review.user) return null;
  const currentUserIsOwnThisReview = currentUser?._id === review.user?._id;
  const displayedDate =
    review.updatedAt !== review.createdAt ? review.updatedAt : review.createdAt;
  return (
    <div className="flex items-start gap-4 font-medium border px-4 py-3 rounded-md">
      <NextImage
        src={review?.user?.profileImg || "/profile.png"}
        alt=""
        width={42}
        height={42}
        className="rounded-full"
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col">
          <div className="flex flex-col mb-1">
            <div className="flex items-center gap-1 text-gray-700">
              <span>{review.user?.name}</span>
              {currentUserIsOwnThisReview && (
                <span className="text-xs text-gray-500"> ({t("you")})</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              <span>{dayjs(displayedDate).fromNow()}</span>
              {review.updatedAt !== review.createdAt && (
                <span className="text-gray-500 "> (edited)</span>
              )}
            </div>
          </div>
          <Rate disabled value={review.rating} className="!text-sm" allowHalf />
        </div>
        <p className="font-normal">{review.title}</p>
      </div>

      <ReviewCardActions
        review={review}
        currentUser={currentUser}
        refetch={refetch}
        currentUserIsOwnThisReview={currentUserIsOwnThisReview}
      />
    </div>
  );
};

export default ReviewCard;
