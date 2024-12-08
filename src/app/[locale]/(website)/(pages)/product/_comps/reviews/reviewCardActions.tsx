import { Button, Popconfirm, Popover, Rate } from "antd";
import NextImage from "@/components/ui/nextImage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import EditReviewModal from "./editReviewModal";
import { useState } from "react";
import { useDeleteReview } from "../../_api/action";
import { Error } from "@/components/ui/error";

const ReviewCardActions = ({
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

            <Popconfirm
              title="Are you sure delete this Review ?"
              okText="Delete"
              cancelText="Cancel"
              onConfirm={handleDelete}
              disabled={deleteIsPending}
            >
              <Button
                loading={deleteIsPending}
                disabled={deleteIsPending}
                className="mt-2 cursor-pointer"
              >
                Delete
              </Button>
            </Popconfirm>

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

export default ReviewCardActions;
