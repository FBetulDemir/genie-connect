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
        "inline-flex items-center gap-1.5 text-sm",
        "transition-colors focus:outline-none",
        active
          ? "text-[var(--accent-blue-500)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
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
