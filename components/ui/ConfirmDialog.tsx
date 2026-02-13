"use client";

import Modal from "./Modal";
import Button from "./Button";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[var(--text-body)]">{description}</p>
        )}
        <div className="flex justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600 focus-visible:ring-red-500"
                : undefined
            }>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
