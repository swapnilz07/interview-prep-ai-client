import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirming = false,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center px-4 pt-4 pb-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <div className="flex w-full flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2">
          <Button
            variant="outline"
            className="w-full sm:w-auto font-semibold"
            onClick={onClose}
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500 font-semibold border-red-600"
            onClick={() => {
              onConfirm();
            }}
            disabled={isConfirming}
          >
            {isConfirming ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
