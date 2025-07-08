"use client";
import { Modal } from "antd";
import React from "react";
import ReviewForm from "./reviewForm";
import { useTranslations } from "next-intl";

const EditReviewModal = ({
  review,
  open,
  customOnSuccess,
}: {
  review: ReviewType;
  open: boolean;
  customOnSuccess?: () => void;
}) => {
  const t = useTranslations("Reviews");
  return (
    <Modal
      title={t("editReview")}
      centered
      open={open}
      onCancel={() => customOnSuccess && customOnSuccess()}
      footer={null}
    >
      <ReviewForm review={review} customOnSuccess={customOnSuccess} />
    </Modal>
  );
};

export default EditReviewModal;
