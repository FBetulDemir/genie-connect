"use client";

import cn from "@/lib/classnames";

type WordCloudItem = {
  tag: string;
  count: number;
};

type WordCloudProps = {
  items: WordCloudItem[];
  onTagClick?: (tag: string) => void;
  className?: string;
};

function getSize(count: number, max: number): string {
  const ratio = max > 0 ? count / max : 0;
  if (ratio > 0.8) return "text-2xl font-semibold";
  if (ratio > 0.6) return "text-xl font-semibold";
  if (ratio > 0.4) return "text-lg font-medium";
  if (ratio > 0.2) return "text-base font-medium";
  return "text-sm font-normal";
}

function getColor(index: number): string {
  const colors = [
    "text-[var(--accent-blue-500)]",
    "text-[var(--accent-blue-400)]",
    "text-[var(--accent-pink-400)]",
    "text-[var(--text-secondary)]",
    "text-[var(--text-primary)]",
  ];
  return colors[index % colors.length];
}

export default function WordCloud({
  items,
  onTagClick,
  className,
}: WordCloudProps) {
  const max = Math.max(...items.map((i) => i.count), 1);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 py-6",
        className,
      )}>
      {items.map((item, index) => (
        <button
          key={item.tag}
          type="button"
          onClick={() => onTagClick?.(item.tag)}
          className={cn(
            "transition-opacity hover:opacity-80",
            getSize(item.count, max),
            getColor(index),
          )}>
          {item.tag}
        </button>
      ))}
    </div>
  );
}
