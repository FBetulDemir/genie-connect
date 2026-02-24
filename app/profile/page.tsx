"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/Toast";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarPicker } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PostCard from "@/components/feed/PostCard";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import EditIcon from "@/components/icons/EditIcon";
import LightbulbIcon from "@/components/icons/LightbulbIcon";
import {
  getStoredProfile,
  updateProfile,
  fetchUserStats,
  Profile,
} from "@/lib/profile";
import { fetchUserPosts } from "@/lib/posts";

type PostRow = {
  id: number;
  title: string;
  content: string;
  hashtags: string[];
  likes_count: number;
  helpful_count: number;
  created_at: string;
  is_anonymous: boolean;
  profiles: { nickname: string; avatar_emoji: string } | null;
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

type Stats = {
  posts: number;
  likes: number;
  comments: number;
  helpful: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats>({
    posts: 0,
    likes: 0,
    comments: 0,
    helpful: 0,
  });
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [editEmoji, setEditEmoji] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = getStoredProfile();
    if (!stored) {
      router.push("/welcome");
      return;
    }
    setProfile(stored);
    setEditNickname(stored.nickname);
    setEditEmoji(stored.avatar_emoji);
    loadData(stored.id);
  }, []);

  const loadData = async (userId: number) => {
    try {
      const [userStats, userPosts] = await Promise.all([
        fetchUserStats(userId),
        fetchUserPosts(userId),
      ]);
      setStats(userStats);
      setPosts(userPosts as PostRow[]);
    } catch (err) {
      console.error("Failed to load profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile || !editNickname.trim()) return;
    setSaving(true);
    try {
      const updated = await updateProfile(
        profile.id,
        editNickname.trim(),
        editEmoji,
      );
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const statItems = [
    {
      icon: <CommentIcon className="h-4 w-4 text-[#51A2FF]" />,
      value: stats.posts,
      label: "Posts",
    },
    {
      icon: <HeartIcon className="h-4 w-4 text-[#FF637E]" />,
      value: stats.likes,
      label: "Likes",
    },
    {
      icon: <CommentIcon className="h-4 w-4 text-[#00D3F2]" />,
      value: stats.comments,
      label: "Comments",
    },
    {
      icon: <LightbulbIcon className="h-4 w-4 text-[#FFB900]" />,
      value: stats.helpful,
      label: "Helpful",
    },
  ];

  return (
    <ToastProvider>
      <AppShell
        nickname={profile?.nickname}
        avatarEmoji={profile?.avatar_emoji}>
        {/* Back to feed */}
        <Button
          variant="link"
          size="sm"
          leftIcon={<ArrowLeftIcon className="h-4 w-4" />}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:no-underline mb-4"
          onClick={() => router.push("/")}>
          Back to Feed
        </Button>

        {loading ? (
          <p className="text-sm text-[var(--text-muted)] py-8 text-center">
            Loading profile...
          </p>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Profile card */}
            <Card>
              <CardContent className="space-y-6">
                {editing ? (
                  // edit mode
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      Edit Profile
                    </h3>
                    <AvatarPicker
                      selected={editEmoji}
                      onSelect={setEditEmoji}
                    />
                    <Input
                      name="nickname"
                      label="Nickname"
                      placeholder="Choose a nickname..."
                      value={editNickname}
                      onChange={(e) => setEditNickname(e.target.value)}
                    />
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!editNickname.trim()}
                        isLoading={saving}
                        onClick={handleSave}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  // view mode
                  <div className="flex items-center gap-4">
                    <Avatar emoji={profile?.avatar_emoji} size="lg" />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-[var(--text-primary)]">
                        {profile?.nickname}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        Member of Agora Community
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<EditIcon className="h-3 w-3" />}
                      onClick={() => setEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                )}

                {/* Stats grid */}
                {!editing && (
                  <div className="grid grid-cols-4 gap-3">
                    {statItems.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex flex-col items-center gap-1 rounded-lg border border-[var(--border-card-default)] bg-[var(--surface)] py-3">
                        <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                          {stat.icon}
                          <span className="text-base font-semibold">
                            {stat.value}
                          </span>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* My Contributions */}
            <Card>
              <CardContent className="space-y-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  My Contributions
                </h3>

                {posts.length === 0 ? (
                  <EmptyState
                    icon={<CommentIcon className="h-8 w-8" />}
                    title="No posts yet"
                    description="Start sharing your thoughts and experiences with the community!"
                  />
                ) : (
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <PostCard
                        key={post.id}
                        id={String(post.id)}
                        avatarEmoji={
                          post.is_anonymous
                            ? undefined
                            : post.profiles?.avatar_emoji
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
                        onClick={() => router.push(`/post/${post.id}`)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </AppShell>
    </ToastProvider>
  );
}
