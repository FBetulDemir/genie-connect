"use client";

import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import cn from "@/lib/classnames";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

type ToastVariant = "success" | "error" | "info";

type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextType = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastMessage key={t.id} item={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastMessage({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(item.id), 4000);
    return () => clearTimeout(timer);
  }, [item.id, onDismiss]);

  const variantStyles = {
    success: "border-green-500/50 text-green-400",
    error: "border-red-500/50 text-red-400",
    info: "border-[var(--accent-blue-500)]/50 text-[var(--accent-blue-400)]",
  };

  const iconMap = {
    success: <CheckIcon className="h-4 w-4" />,
    error: <CloseIcon className="h-4 w-4" />,
    info: <CheckIcon className="h-4 w-4" />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border bg-[var(--surface-muted)] px-4 py-3 shadow-lg",
        variantStyles[item.variant],
      )}>
      {iconMap[item.variant]}
      <span className="text-sm text-[var(--text-primary)]">{item.message}</span>
      <button
        onClick={() => onDismiss(item.id)}
        className="ml-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Dismiss">
        <CloseIcon className="h-3 w-3" />
      </button>
    </div>
  );
}
