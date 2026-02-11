"use client";

import React from "react";
import CloseIcon from "../icons/CloseIcon";
import cn from "@/lib/classnames";

type ModalSize = "sm" | "md" | "lg" | "xl";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
};

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal = ({
  open,
  onClose,
  children,
  size = "lg",
  className,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* content */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-6",
          sizeMap[size],
          className,
        )}>
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-card-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
          aria-label="Close">
          <CloseIcon className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
