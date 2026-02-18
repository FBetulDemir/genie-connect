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

// maps count to a font size between 0.75rem and 2rem — every tag gets a unique-ish size
function getFontSize(count: number, min: number, max: number): number {
  if (max === min) return 1.125;
  const ratio = (count - min) / (max - min);
  return 0.75 + ratio * 1.25;
}

// heavier weight for bigger tags so they really stand out
function getFontWeight(count: number, min: number, max: number): number {
  if (max === min) return 500;
  const ratio = (count - min) / (max - min);
  if (ratio > 0.6) return 700;
  if (ratio > 0.3) return 600;
  return 400;
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
  const counts = items.map((i) => i.count);
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts, 0);

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
          style={{
            fontSize: `${getFontSize(item.count, min, max)}rem`,
            fontWeight: getFontWeight(item.count, min, max),
          }}
          className={cn(
            "transition-opacity hover:opacity-80",
            getColor(index),
          )}>
          {item.tag}
        </button>
      ))}
    </div>
  );
}
