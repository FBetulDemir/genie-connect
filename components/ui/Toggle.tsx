"use client";

import cn from "@/lib/classnames";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export default function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
          checked
            ? "bg-[var(--accent-blue-500)]"
            : "bg-[var(--border-card-strong)]",
          disabled && "cursor-not-allowed",
        )}>
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-muted)]">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
