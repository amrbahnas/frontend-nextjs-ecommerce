import { Button, Popover, Rate } from "antd";

import NextImage from "@/components/ui/nextImage";

import { HiOutlineDotsVertical } from "react-icons/hi";
import EditReviewModal from "./editReviewModal";
import { useState } from "react";
import { useDeleteReview } from "../../_api/action";
import { Error } from "@/components/error";

const ReviewCard = ({
  review,
  currentUser,
  refetch,
}: {
  review: ReviewType;
  currentUser: User | null;
  refetch: () => void;
}) => {
  return (
    <div className="flex items-start gap-4 font-medium border px-4 py-3 rounded-md">
      <NextImage
        src={review?.user?.profileImg || "/profile.png"}
        alt=""
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col">
          <span>{review.user?.name}</span>
          <Rate disabled value={review.rating} className="!text-sm" />
        </div>
        <p className="font-normal text-gray-500">{review.title}</p>
      </div>

      <CardActions
        review={review}
        currentUser={currentUser}
        refetch={refetch}
      />
    </div>
  );
};

const CardActions = ({
  review,
  currentUser,
  refetch,
}: {
  review: ReviewType;
  currentUser: User | null;
  refetch: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const {
    deleteReview,
    error,
    isPending: deleteIsPending,
  } = useDeleteReview(review._id);

  const handleDelete = () => {
    deleteReview(
      {},
      {
        onSuccess: refetch,
      }
    );
  };
  return (
    <>
      <Popover
        trigger="click"
        placement="bottom"
        content={
          <div className="flex flex-col gap-2">
            <Button
              disabled={currentUser?.role === "admin"}
              className="mt-2 cursor-pointer"
              type="primary"
              onClick={() => setOpen(true)}
            >
              Edit
            </Button>

            <Button
              loading={deleteIsPending}
              disabled={deleteIsPending}
              onClick={handleDelete}
              className="mt-2 cursor-pointer"
            >
              Delete
            </Button>
            <Error error={error} />
          </div>
        }
      >
        {(currentUser?.role === "admin" ||
          currentUser?._id === review.user?._id) && (
          <HiOutlineDotsVertical className=" cursor-pointer" />
        )}
      </Popover>

      <EditReviewModal
        open={open}
        review={review}
        customOnSuccess={() => {
          refetch();
          setOpen(false);
        }}
      />
    </>
  );
};

export default ReviewCard;
