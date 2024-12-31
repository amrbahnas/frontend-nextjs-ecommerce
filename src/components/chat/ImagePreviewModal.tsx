import { Modal, Button } from "antd";

interface ImagePreviewModalProps {
  imagePreview: string | null;
  onCancel: () => void;
  onSend: () => void;
  loading: boolean;
}

export const ImagePreviewModal = ({
  imagePreview,
  onCancel,
  onSend,
  loading,
}: ImagePreviewModalProps) => {
  return (
    <Modal
      title="Preview Image"
      open={!!imagePreview}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="send" type="primary" onClick={onSend} loading={loading}>
          Send Image
        </Button>,
      ]}
      width={400}
    >
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ width: "100%" }} />
      )}
    </Modal>
  );
};
