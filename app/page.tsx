"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import Sidebar from "@/components/layout/Sidebar";
import { ToastProvider } from "@/components/ui/Toast";
import { Card, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import CommentIcon from "@/components/icons/CommentIcon";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import Button from "@/components/ui/Button";
import PostCard from "@/components/feed/PostCard";
import { fetchPosts, toggleHelpful, getUserHelpfuls, toggleLike, getUserLikes } from "@/lib/posts";
import { getStoredProfile, Profile } from "@/lib/profile";

// shape of a post row coming from supabase (includes joined profile + comment count)
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

// turns a date string into something like "5m ago" or "2d ago"
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

export default function Home() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<PostRow[]>([]);
  // keep track of which posts this user already liked / marked helpful
  const [helpfulSet, setHelpfulSet] = useState<Set<number>>(new Set());
  const [likeSet, setLikeSet] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>(); // which hashtag the user picked from the word cloud
  const [visibleCount, setVisibleCount] = useState(7); // start with 7 posts, more load on demand
  const [showScrollTop, setShowScrollTop] = useState(false); // show the back-to-top button after scrolling down

  // show the scroll-to-top button once the user has scrolled down enough
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // on first load: grab profile from localStorage, redirect to welcome if none
  useEffect(() => {
    const stored = getStoredProfile();
    if (!stored) {
      router.push("/welcome");
      return;
    }
    setProfile(stored);
    loadPosts(stored.id);
  }, []);

  // fetch all posts, then check which ones this user already liked/helpfuled
  const loadPosts = async (userId?: number) => {
    try {
      const data = await fetchPosts();
      const rows = data as PostRow[];
      setPosts(rows);
      if (userId) {
        const ids = rows.map((p) => p.id);
        const [helpfuls, likes] = await Promise.all([
          getUserHelpfuls(userId, ids),
          getUserLikes(userId, ids),
        ]);
        setHelpfulSet(helpfuls);
        setLikeSet(likes);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // toggle like on a post — updates the count and highlights/unhighlights the heart
  const handleLike = async (id: string) => {
    if (!profile) return;
    const postId = Number(id);
    const { active, count } = await toggleLike(postId, profile.id);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes_count: count } : p)),
    );
    setLikeSet((prev) => {
      const next = new Set(prev);
      if (active) next.add(postId);
      else next.delete(postId);
      return next;
    });
  };

  // same idea but for the "helpful" button
  const handleHelpful = async (id: string) => {
    if (!profile) return;
    const postId = Number(id);
    const { active, count } = await toggleHelpful(postId, profile.id);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, helpful_count: count } : p)),
    );
    setHelpfulSet((prev) => {
      const next = new Set(prev);
      if (active) next.add(postId);
      else next.delete(postId);
      return next;
    });
  };

  // filter posts by active tag, then slice to what's currently visible
  const filteredPosts = activeTag
    ? posts.filter((p) =>
        p.hashtags?.some((h) => h.replace(/^#/, "") === activeTag || h === activeTag),
      )
    : posts;
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  return (
    <ToastProvider>
      <AppShell
        nickname={profile?.nickname}
        avatarEmoji={profile?.avatar_emoji}
        onPublished={() => loadPosts()} // refresh feed after creating a new post
        sidebar={
          // clicking a tag in the word cloud filters the feed, clicking it again clears the filter
          <Sidebar
            onTagClick={(tag) => {
              setActiveTag((prev) => (prev === tag ? undefined : tag));
              setVisibleCount(7); // reset back to 7 when switching tags
            }}
            activeTag={activeTag}
          />
        }>
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
            {/* welcome banner at the top of the feed */}
            <Card variant="bordered">
              <CardContent>
                <p className="text-base font-semibold text-[var(--text-primary)]">Community Feed</p>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">
                  Share experiences, ask questions, and support each other 💪
                </p>
              </CardContent>
            </Card>
            {/* show a little "Filtering by #tag" bar when a hashtag is selected */}
            {activeTag && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--text-secondary)]">
                  Filtering by <span className="font-semibold text-[var(--accent-blue-400)]">#{activeTag}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTag(undefined)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  Clear
                </button>
              </div>
            )}
            {/* if a tag is active, only keep posts that have it — otherwise show everything */}
            {visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                id={String(post.id)}
                // hide avatar & name if the post was published anonymously
                avatarEmoji={
                  post.is_anonymous ? undefined : post.profiles?.avatar_emoji
                }
                name={
                  post.is_anonymous
                    ? "Anonymous"
                    : (post.profiles?.nickname ?? "Anonymous")
                }
                timeAgo={timeAgo(post.created_at)}
                title={post.title}
                content={post.content}
                hashtags={post.hashtags}
                likes={post.likes_count}
                commentCount={post.comments?.[0]?.count ?? 0}
                helpful={post.helpful_count}
                likeActive={likeSet.has(post.id)}
                helpfulActive={helpfulSet.has(post.id)}
                onLike={handleLike}
                onHelpful={handleHelpful}
                onClick={() => router.push(`/post/${post.id}`)}
              />
            ))}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setVisibleCount((prev) => prev + 7)}>
                  Show more
                </Button>
              </div>
            )}
          </div>
        )}
      </AppShell>
      {/* floating button — only shows up after scrolling down 300px */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-[var(--accent-blue-500)] text-white shadow-lg hover:bg-[var(--accent-blue-400)] transition-colors"
          aria-label="Back to top">
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      )}
    </ToastProvider>
  );
}
