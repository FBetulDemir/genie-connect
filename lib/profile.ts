import { supabase } from "./supabase";

const PROFILE_KEY = "genie-connect-profile";

export type Profile = {
  id: number;
  nickname: string;
  avatar_emoji: string;
};

export function getStoredProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function storeProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

export async function createProfile(nickname: string, avatarEmoji: string) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      nickname,
      avatar_emoji: avatarEmoji,
    })
    .select()
    .single();

  if (error) throw error;

  const profile: Profile = {
    id: data.id,
    nickname: data.nickname,
    avatar_emoji: data.avatar_emoji,
  };

  storeProfile(profile);
  return profile;
}

export async function updateProfile(id: number, nickname: string, avatarEmoji: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ nickname, avatar_emoji: avatarEmoji })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  const profile: Profile = {
    id: data.id,
    nickname: data.nickname,
    avatar_emoji: data.avatar_emoji,
  };

  storeProfile(profile);
  return profile;
}

export async function fetchUserStats(userId: number) {
  const [posts, likes, comments, helpfuls] = await Promise.all([
    supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("author_id", userId),
    supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("author_id", userId),
    supabase
      .from("post_helpfuls")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
  ]);

  return {
    posts: posts.count ?? 0,
    likes: likes.count ?? 0,
    comments: comments.count ?? 0,
    helpful: helpfuls.count ?? 0,
  };
}
