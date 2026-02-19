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

/** Map count → pill size tier (padding + font size). Biggest count = biggest bubble. */
function getSizeTier(
  count: number,
  min: number,
  max: number,
): "xs" | "sm" | "md" | "lg" | "xl" {
  if (max === min) return "md";
  const ratio = (count - min) / (max - min);
  if (ratio > 0.8) return "xl";
  if (ratio > 0.55) return "lg";
  if (ratio > 0.3) return "md";
  if (ratio > 0.1) return "sm";
  return "xs";
}

const sizeClasses: Record<string, string> = {
  xs: "text-[0.65rem] px-3 py-1",
  sm: "text-xs px-3.5 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
  xl: "text-lg px-6 py-3 font-semibold",
};

export default function WordCloud({
  items,
  onTagClick,
  className,
}: WordCloudProps) {
  const counts = items.map((i) => i.count);
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts, 0);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5 py-4",
        className,
      )}>
      {items.map((item) => {
        const tier = getSizeTier(item.count, min, max);
        return (
          <button
            key={item.tag}
            type="button"
            onClick={() => onTagClick?.(item.tag)}
            className={cn(
              "rounded-full border border-[var(--accent-blue-500)] text-[var(--text-primary)]",
              "bg-[var(--surface-muted)]",
              "shadow-[0_0_6px_var(--accent-blue-500)]",
              "hover:shadow-[0_0_12px_var(--accent-blue-500)] hover:bg-[var(--accent-blue-500)]/10",
              "transition-all duration-200",
              sizeClasses[tier],
            )}>
            {item.tag.startsWith("#") ? item.tag : `#${item.tag}`}
          </button>
        );
      })}
    </div>
  );
}
