"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import WordCloud from "@/components/hashtags/WordCloud";
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
        <CardTitle>Trending Topics</CardTitle>
        <WordCloud items={items} />
      </CardContent>
    </Card>
  );
}

// the right-hand sidebar — more sections here in the future, but for now just trending topics
export default function Sidebar() {
  return (
    <div className="space-y-6">
      <TrendingTopics />
    </div>
  );
}
