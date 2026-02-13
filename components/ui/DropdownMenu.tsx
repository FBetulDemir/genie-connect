"use client";

import React, { useState, useRef, useEffect } from "react";
import cn from "@/lib/classnames";
import MoreHorizontalIcon from "../icons/MoreHorizontalIcon";

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
};

type DropdownMenuProps = {
  items: MenuItem[];
  trigger?: React.ReactNode;
  className?: string;
};

export default function DropdownMenu({
  items,
  trigger,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
        aria-label="More options"
        aria-expanded={open}>
        {trigger ?? <MoreHorizontalIcon className="h-4 w-4" />}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 min-w-[160px] rounded-lg border border-[var(--border-card-default)] bg-[var(--surface-muted)] py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                item.variant === "danger"
                  ? "text-red-400 hover:bg-red-400/10"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]",
              )}>
              {item.icon && <span className="inline-flex">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
