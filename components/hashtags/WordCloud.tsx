"use client";

import cn from "@/lib/classnames";

// each hashtag has a name and how many times it's been used
type WordCloudItem = {
  tag: string;
  count: number;
};

type WordCloudProps = {
  items: WordCloudItem[]; // the list of hashtags to display
  onTagClick?: (tag: string) => void; // called when someone clicks a bubble
  activeTag?: string; // which tag is currently selected (if any)
  className?: string;
};

// figures out how big a bubble should be based on how popular the tag is.
// we compare each tag's count against the lowest and highest in the list,
// then pick a size tier from xs (tiny) to xl (huge).
function getSizeTier(
  count: number,
  min: number,
  max: number,
): "xs" | "sm" | "md" | "lg" | "xl" {
  if (max === min) return "md"; // all tags have the same count, so just use medium
  const ratio = (count - min) / (max - min); // 0 = least popular, 1 = most popular
  if (ratio > 0.8) return "xl";
  if (ratio > 0.55) return "lg";
  if (ratio > 0.3) return "md";
  if (ratio > 0.1) return "sm";
  return "xs";
}

// tailwind classes for each size tier — bigger tiers get larger text and more padding
const sizeClasses: Record<string, string> = {
  xs: "text-[0.65rem] px-3 py-1",
  sm: "text-xs px-3.5 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
  xl: "text-lg px-6 py-3 font-semibold",
};

// renders hashtags as glowing oval shaped bubbles.
// the more a tag is used, the bigger its bubble.
// clicking a bubble filters the feed to show only posts with that tag.
export default function WordCloud({
  items,
  onTagClick,
  activeTag,
  className,
}: WordCloudProps) {
  // sort by most used and cap at 12 so the cloud doesn't get overwhelming
  const topItems = [...items].sort((a, b) => b.count - a.count).slice(0, 12);

  // grab the min and max counts from the top 12 only, so sizes scale within that range
  const counts = topItems.map((i) => i.count);
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts, 0);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5 py-4",
        className,
      )}>
      {topItems.map((item) => {
        const tier = getSizeTier(item.count, min, max);

        // strip the leading # so we can compare consistently
        const rawTag = item.tag.replace(/^#/, "");
        const isActive = activeTag === rawTag || activeTag === item.tag;

        return (
          <button
            key={item.tag}
            type="button"
            onClick={() => onTagClick?.(rawTag)}
            className={cn(
              // base: rounded pill with a border and smooth transitions
              "rounded-full border text-[var(--text-primary)] cursor-pointer",
              "transition-all duration-200",
              sizeClasses[tier],
              // active tag gets a brighter glow to know which one is selected
              isActive
                ? "border-[var(--accent-blue-400)] bg-[var(--accent-blue-500)]/20 shadow-[0_0_14px_var(--accent-blue-400)]"
                : "border-[var(--accent-blue-500)] bg-[var(--surface-muted)] shadow-[0_0_6px_var(--accent-blue-500)] hover:shadow-[0_0_12px_var(--accent-blue-500)] hover:bg-[var(--accent-blue-500)]/10",
            )}>
            {/* show the tag with a # prefix, but don't double up if it already has one */}
            {item.tag.startsWith("#") ? item.tag : `#${item.tag}`}
          </button>
        );
      })}
    </div>
  );
}
