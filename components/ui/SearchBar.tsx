"use client";

import { useState } from "react";
import cn from "@/lib/classnames";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
};

export default function SearchBar({
  placeholder = "Search...",
  value: controlledValue,
  onChange,
  onSearch,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  const handleChange = (val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  const handleClear = () => {
    handleChange("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-[var(--border-card-default)] bg-[var(--surface)] px-9 py-2",
          "text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
          "focus:outline-none focus:border-[var(--accent-blue-500)]",
          "transition-colors",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Clear search">
          <CloseIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
