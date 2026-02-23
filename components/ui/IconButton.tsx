import React from "react";
import cn from "@/lib/classnames";

type IconButtonProps = {
  icon: React.ReactNode;
  "aria-label": string;
  count?: number;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function IconButton({
  icon,
  count,
  label,
  onClick,
  active = false,
  disabled = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm rounded-lg px-2 py-1",
        "transition-all duration-150 focus:outline-none",
        "hover:scale-105 active:scale-95",
        active
          ? "text-[var(--accent-blue-500)] bg-(--accent-blue-500)/10"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}>
      {icon}
      {count !== undefined && <span>{count}</span>}
      {label && <span>{label}</span>}
    </button>
  );
}
