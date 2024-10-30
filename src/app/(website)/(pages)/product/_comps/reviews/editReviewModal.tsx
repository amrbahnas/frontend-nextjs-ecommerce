import { Modal } from "antd";
import React from "react";
import ReviewForm from "./reviewForm";

const EditReviewModal = ({
  review,
  open,
  customOnSuccess,
}: {
  review: ReviewType;
  open: boolean;
  customOnSuccess?: () => void;
}) => {
  return (
    <Modal
      title="Edit Review"
      open={open}
      onCancel={() => customOnSuccess && customOnSuccess()}
      footer={null}
    >
      <ReviewForm review={review} customOnSuccess={customOnSuccess} />
    </Modal>
  );
};

export default EditReviewModal;
