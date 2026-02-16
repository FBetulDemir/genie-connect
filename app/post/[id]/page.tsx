"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppShell from "@/components/ui/AppShell";
import PostThread, { Reply } from "@/components/ui/PostThread";
import { ToastProvider } from "@/components/ui/Toast";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { fetchPost } from "@/lib/posts";
import {
  fetchComments,
  createComment,
  buildCommentTree,
  CommentNode,
} from "@/lib/comments";
import { getStoredProfile, Profile } from "@/lib/profile";

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

function nodeToReply(node: CommentNode): Reply {
  return {
    id: String(node.id),
    avatarEmoji: node.profiles?.avatar_emoji,
    name: node.profiles?.nickname ?? "Anonymous",
    timeAgo: timeAgo(node.created_at),
    content: node.content,
    likes: node.likes_count,
    replies: node.children.map(nodeToReply),
  };
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [post, setPost] = useState<{
    id: number;
    title: string;
    content: string;
    hashtags: string[];
    likes_count: number;
    helpful_count: number;
    created_at: string;
    is_anonymous: boolean;
    profiles: { nickname: string; avatar_emoji: string } | null;
  } | null>(null);

  const [comments, setComments] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [postData, commentsData] = await Promise.all([
        fetchPost(postId),
        fetchComments(postId),
      ]);
      setPost(postData);
      const tree = buildCommentTree(commentsData);
      setComments(tree.map(nodeToReply));
    } catch (err) {
      console.error("Failed to load post:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = getStoredProfile();
    if (!stored) {
      router.push("/welcome");
      return;
    }
    setProfile(stored);
    if (postId) loadData();
  }, [postId]);

  const handleReply = async (parentId: string, content: string) => {
    // If parentId matches the post id, it's a top-level comment
    const isTopLevel = parentId === String(postId);
    const parentCommentId = isTopLevel ? null : Number(parentId);

    // Find depth of the parent comment
    let depth = 0;
    if (!isTopLevel) {
      const findDepth = (replies: Reply[]): number | null => {
        for (const r of replies) {
          if (r.id === parentId) return 0;
          if (r.replies) {
            const d = findDepth(r.replies);
            if (d !== null) return d + 1;
          }
        }
        return null;
      };
      const parentDepth = findDepth(comments);
      depth = (parentDepth ?? 0) + 1;
    }

    try {
      await createComment({
        postId,
        parentId: parentCommentId,
        authorId: profile!.id,
        content,
        depth,
      });
      // Reload comments to get fresh data
      const commentsData = await fetchComments(postId);
      const tree = buildCommentTree(commentsData);
      setComments(tree.map(nodeToReply));
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  if (loading) {
    return (
      <ToastProvider>
        <AppShell nickname={profile?.nickname} avatarEmoji={profile?.avatar_emoji}>
          <p className="text-sm text-[var(--text-muted)] py-8 text-center">
            Loading post...
          </p>
        </AppShell>
      </ToastProvider>
    );
  }

  if (!post) {
    return (
      <ToastProvider>
        <AppShell nickname={profile?.nickname} avatarEmoji={profile?.avatar_emoji}>
          <p className="text-sm text-[var(--text-muted)] py-8 text-center">
            Post not found.
          </p>
        </AppShell>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <AppShell nickname={profile?.nickname} avatarEmoji={profile?.avatar_emoji}>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to feed
        </button>

        <PostThread
          post={{
            id: String(post.id),
            avatarEmoji: post.is_anonymous ? undefined : post.profiles?.avatar_emoji,
            name: post.is_anonymous ? "Anonymous" : (post.profiles?.nickname ?? "Anonymous"),
            timeAgo: timeAgo(post.created_at),
            title: post.title,
            content: post.content,
            hashtags: post.hashtags,
            likes: post.likes_count,
            helpful: post.helpful_count,
            comments,
          }}
          onReply={handleReply}
        />
      </AppShell>
    </ToastProvider>
  );
}
