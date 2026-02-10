import * as React from "react";
import cn from "@/lib/classnames";

type HashtagVariant = "default" | "outlined" | "selected";
type HashtagSize = "sm" | "md" | "lg";

interface HashtagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HashtagVariant;
  size?: HashtagSize;
  count?: number;
  selected?: boolean;
  children: React.ReactNode;
}

const getSizeClasses = (size: HashtagSize): string => {
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  };
  return sizes[size];
};

export default function Hashtag({
  variant = "default",
  size = "md",
  count,
  selected = false,
  className,
  children,
  ...props
}: HashtagProps) {
  const isSelected = selected || variant === "selected";

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--accent-blue-500)]",

        // sizes
        getSizeClasses(size),

        // variants
        variant === "default" &&
          !isSelected &&
          "border border-[var(--accent-blue-500)] text-[var(--accent-blue-500)] bg-transparent hover:bg-[var(--accent-blue-200)]",

        variant === "outlined" &&
          !isSelected &&
          "border border-[var(--border-card-strong)] text-[var(--text-secondary)] bg-transparent hover:bg-[var(--surface)]",

        isSelected &&
          "border border-[var(--accent-blue-500)] text-[var(--accent-blue-500)] bg-[var(--accent-blue-200)]",

        props.disabled && "opacity-50 cursor-not-allowed",

        className,
      )}
      {...props}>
      {children}
      {count !== undefined && (
        <span className="opacity-75 text-xs">{count}</span>
      )}
    </button>
  );
}

interface HashtagCloudProps {
  className?: string;
  children: React.ReactNode;
}

export function HashtagCloud({ className, children }: HashtagCloudProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
}

interface HashtagListItem {
  tag: string;
  count?: number;
  rank?: number;
}

interface HashtagListProps {
  items: HashtagListItem[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function HashtagList({
  items,
  onTagClick,
  className,
}: HashtagListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <button
          key={item.tag}
          onClick={() => onTagClick?.(item.tag)}
          className={cn(
            "w-full flex items-center justify-between py-2 px-3 rounded-lg",
            "text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors",
            "text-sm group",
          )}>
          <div className="flex items-center gap-3">
            {item.rank && (
              <span className="text-[var(--accent-blue-500)] font-semibold min-w-[1.5rem]">
                {item.rank}
              </span>
            )}
            <span className="group-hover:text-[var(--text-primary)]">
              {item.tag}
            </span>
          </div>
          {item.count !== undefined && (
            <span className="text-[var(--text-muted)]">{item.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
