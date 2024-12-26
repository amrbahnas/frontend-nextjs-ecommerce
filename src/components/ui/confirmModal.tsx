import { Modal, ModalProps } from "antd";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmModalProps extends Omit<ModalProps, "title"> {
  title: string;
  itemsCount?: number;
  itemName?: string;
  action: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmModal = ({
  title,
  itemsCount = 1,
  itemName = "items",
  action,
  onConfirm,
  isLoading = false,
  ...modalProps
}: ConfirmModalProps) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-yellow-500">
          <FaExclamationTriangle />
          <span>{title}</span>
        </div>
      }
      onOk={onConfirm}
      confirmLoading={isLoading}
      okText={`Yes, ${action}`}
      cancelText="Cancel"
      {...modalProps}
    >
      <p>
        Are you sure you want to {action.toLowerCase()} {itemsCount} {itemName}
        {itemsCount > 1 ? "s" : ""}?
      </p>
      <p className="text-gray-500 text-sm mt-2">
        This action cannot be undone.
      </p>
    </Modal>
  );
};

export default ConfirmModal;
