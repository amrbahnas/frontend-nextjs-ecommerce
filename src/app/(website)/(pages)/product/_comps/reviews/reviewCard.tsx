import { Button, Popover, Rate } from "antd";

import NextImage from "@/components/ui/nextImage";

import { HiOutlineDotsVertical } from "react-icons/hi";
import EditReviewModal from "./editReviewModal";
import { useState } from "react";
import { useDeleteReview } from "../../_api/action";
import { Error } from "@/components/ui/error";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ReviewCard = ({
  review,
  currentUser,
  refetch,
}: {
  review: ReviewType;
  currentUser: User | null;
  refetch: () => void;
}) => {
  const currentUserIsOwnThisReview = currentUser?._id === review.user?._id;
  const displayedDate =
    review.updatedAt !== review.createdAt ? review.updatedAt : review.createdAt;
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
          <div className="flex flex-col mb-1">
            <div>
              <span>{review.user?.name}</span>
              {currentUserIsOwnThisReview && (
                <span className="text-xs text-gray-500"> (You)</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              <span>{dayjs(displayedDate).fromNow()}</span>
              {review.updatedAt !== review.createdAt && (
                <span className="text-gray-500 "> (edited)</span>
              )}
            </div>
          </div>
          <Rate disabled value={review.rating} className="!text-sm" />
        </div>
        <p className="font-normal text-gray-500">{review.title}</p>
      </div>

      <CardActions
        review={review}
        currentUser={currentUser}
        refetch={refetch}
        currentUserIsOwnThisReview={currentUserIsOwnThisReview}
      />
    </div>
  );
};

const CardActions = ({
  review,
  currentUser,
  refetch,
  currentUserIsOwnThisReview,
}: {
  review: ReviewType;
  currentUser: User | null;
  refetch: () => void;
  currentUserIsOwnThisReview: boolean;
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openActionsMenu, setOpenActionsMenu] = useState(false);
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
        open={openActionsMenu}
        onOpenChange={setOpenActionsMenu}
        content={
          <div className="flex flex-col gap-2">
            <Button
              disabled={!currentUserIsOwnThisReview}
              className="mt-2 cursor-pointer"
              type="primary"
              onClick={() => {
                setOpenActionsMenu(false);
                setOpenEditModal(true);
              }}
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
        {(currentUser?.role === "admin" || currentUserIsOwnThisReview) && (
          <HiOutlineDotsVertical className=" cursor-pointer" />
        )}
      </Popover>

      <EditReviewModal
        open={openEditModal}
        review={review}
        customOnSuccess={() => {
          refetch();
          setOpenEditModal(false);
        }}
      />
    </>
  );
};

export default ReviewCard;
