"use client";
import { Button, Popconfirm, Popover, Rate } from "antd";
import NextImage from "@/components/ui/nextImage";
import { HiOutlineDotsVertical } from "react-icons/hi";
import EditReviewModal from "./editReviewModal";
import { useState } from "react";
import { useDeleteReview } from "../../_api/action";
import { Error } from "@/components/ui/error";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Common");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openActionsMenu, setOpenActionsMenu] = useState(false);
  const {
    deleteReview,
    error,
    isPending: deleteIsPending,
  } = useDeleteReview(review.id);

  const handleDelete = () => {
    deleteReview(
      {},
      {
        onSuccess: refetch,
      }
    );
  };
  return (
    <div>
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
              {t("edit")}
            </Button>

            <Popconfirm
              title={t("areYouSureDeleteThisReview")}
              okText={t("delete")}
              cancelText={t("cancel")}
              onConfirm={handleDelete}
              disabled={deleteIsPending}
            >
              <Button
                loading={deleteIsPending}
                disabled={deleteIsPending}
                className="mt-2 cursor-pointer"
              >
                {t("delete")}
              </Button>
            </Popconfirm>

            <Error error={error} />
          </div>
        }
      >
        {(currentUser?.role === "admin" || currentUserIsOwnThisReview) && (
          <div>
            <HiOutlineDotsVertical className="cursor-pointer" />
          </div>
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
    </div>
  );
};

export default ReviewCardActions;
