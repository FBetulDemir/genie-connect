"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import WordCloud from "@/components/hashtags/WordCloud";
import AskAI from "@/components/ai/AskAI";
import { fetchHashtagCounts } from "@/lib/posts";

type HashtagItem = { tag: string; count: number };

// fetches trending hashtags and renders them as a word cloud
function TrendingTopics() {
  const [items, setItems] = useState<HashtagItem[]>([]);

  useEffect(() => {
    fetchHashtagCounts()
      .then(setItems)
      .catch((err) => console.error("Failed to load hashtags:", err));
  }, []);

  if (items.length === 0) return null;

  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>Trending Topics</span>
          </CardTitle>
          <span className="text-xs text-[var(--accent-blue-400)] font-medium">
            # View Cloud
          </span>
        </div>
        <WordCloud items={items} />
        <p className="text-[0.65rem] text-[var(--text-muted)] text-center">
          Bigger bubbles = more discussions
        </p>
      </CardContent>
    </Card>
  );
}

// the right-hand sidebar — more sections here in the future, but for now just trending topics
export default function Sidebar() {
  return (
    <div className="space-y-6">
      <AskAI />
      <TrendingTopics />
    </div>
  );
}
