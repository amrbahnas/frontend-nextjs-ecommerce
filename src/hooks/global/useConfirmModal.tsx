import ConfirmModal from "@/components/ui/confirmModal";
import { useState, useCallback } from "react";

interface ConfirmModalOptions {
  title: string;
  itemsCount?: number;
  itemName?: string;
  action: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmModalOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showConfirmModal = useCallback((modalOptions: ConfirmModalOptions) => {
    setOptions(modalOptions);
    setIsOpen(true);
  }, []);

  const hideConfirmModal = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
    setIsLoading(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!options?.onConfirm) return;

    try {
      setIsLoading(true);
      await options.onConfirm();
      hideConfirmModal();
    } catch (error) {
      console.error("Error in confirm action:", error);
    } finally {
      setIsLoading(false);
    }
  }, [options, hideConfirmModal]);

  const ConfirmModalComponent = useCallback(() => {
    if (!options) return null;

    return (
      <ConfirmModal
        open={isOpen}
        onCancel={hideConfirmModal}
        title={options.title}
        action={options.action}
        itemName={options.itemName}
        itemsCount={options.itemsCount}
        onConfirm={handleConfirm}
        isLoading={isLoading || options.isLoading}
      />
    );
  }, [isOpen, options, isLoading, hideConfirmModal, handleConfirm]);

  return {
    showConfirmModal,
    hideConfirmModal,
    ConfirmModalComponent,
    isOpen,
    isLoading,
  };
};

// Example usage:
/*
const MyComponent = () => {
  const { showConfirmModal, ConfirmModalComponent } = useConfirmModal();

  const handleDelete = () => {
    showConfirmModal({
      title: "Delete Item",
      action: "delete",
      itemName: "item",
      onConfirm: async () => {
        // Perform delete action
        await deleteItem();
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <ConfirmModalComponent />
    </>
  );
};
*/
