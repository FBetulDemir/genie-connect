"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/ui/AppShell";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import Hashtag from "@/components/ui/Hashtag";
import { ToastProvider } from "@/components/ui/Toast";
import EmptyState from "@/components/ui/EmptyState";
import CommentIcon from "@/components/icons/CommentIcon";
import Button from "@/components/ui/Button";
import PostCard from "@/components/feed/PostCard";
import { fetchPosts } from "@/lib/posts";

type PostRow = {
  id: number;
  author_id: number;
  title: string;
  content: string;
  hashtags: string[];
  likes_count: number;
  helpful_count: number;
  created_at: string;
  profiles: {
    nickname: string;
    avatar_emoji: string;
  } | null;
  is_anonymous: boolean;
  comments: { count: number }[];
};

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const Sidebar = () => (
  <Card>
    <CardContent className="space-y-2">
      <CardTitle>Trending Topics</CardTitle>
      <div className="flex flex-wrap gap-2">
        <Hashtag size="md">#mentorship</Hashtag>
        <Hashtag size="md">#allyship</Hashtag>
        <Hashtag size="md">#career</Hashtag>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data as PostRow[]);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ToastProvider>
      <AppShell
        nickname="Nicky"
        avatarEmoji="😺"
        onPublished={() => loadPosts()}
        sidebar={<Sidebar />}>
        {loading ? (
          <p className="text-sm text-[var(--text-muted)] py-8 text-center">
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <EmptyState
            icon={<CommentIcon className="h-10 w-10" />}
            title="No posts yet"
            description="Be the first to share your experience or ask a question."
            action={
              <Button variant="primary" size="sm">
                Create Post
              </Button>
            }
          />
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={String(post.id)}
                avatarEmoji={post.is_anonymous ? undefined : post.profiles?.avatar_emoji}
                name={post.is_anonymous ? "Anonymous" : (post.profiles?.nickname ?? "Anonymous")}
                timeAgo={timeAgo(post.created_at)}
                title={post.title}
                content={post.content}
                hashtags={post.hashtags}
                likes={post.likes_count}
                commentCount={post.comments?.[0]?.count ?? 0}
                helpful={post.helpful_count}
                onClick={() => router.push(`/post/${post.id}`)}
              />
            ))}
          </div>
        )}
      </AppShell>
    </ToastProvider>
  );
}
