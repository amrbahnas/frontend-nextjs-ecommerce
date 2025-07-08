import { Modal, Button } from "antd";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("chat.input.imagePreview");

  return (
    <Modal
      title={t("title")}
      open={!!imagePreview}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("cancel")}
        </Button>,
        <Button key="send" type="primary" onClick={onSend} loading={loading}>
          {t("send")}
        </Button>,
      ]}
      width={400}
    >
      {imagePreview && (
        <img src={imagePreview} alt={t("alt")} style={{ width: "100%" }} />
      )}
    </Modal>
  );
};
