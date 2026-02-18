import { supabase } from "./supabase";

type CreatePostInput = {
  authorId: number;
  title: string;
  content: string;
  hashtags: string[];
  isAnonymous: boolean;
};

export async function createPost(input: CreatePostInput) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: input.authorId,
      title: input.title,
      content: input.content,
      hashtags: input.hashtags,
      is_anonymous: input.isAnonymous,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchPost(id: number) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, avatar_emoji)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, avatar_emoji), comments(count)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/** Toggle helpful on/off for a post. Returns the new count and whether the user now has it active. */
export async function toggleHelpful(postId: number, userId: number) {
  // Check if user already marked helpful
  const { data: existing } = await supabase
    .from("post_helpfuls")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("post_helpfuls").delete().eq("id", existing.id);
  } else {
    const { error } = await supabase
      .from("post_helpfuls")
      .insert({ post_id: postId, user_id: userId });
    if (error) throw error;
  }

  // Get fresh count from the source of truth
  const { count } = await supabase
    .from("post_helpfuls")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  const newCount = count ?? 0;

  // Keep posts.helpful_count in sync
  await supabase.from("posts").update({ helpful_count: newCount }).eq("id", postId);

  return { active: !existing, count: newCount };
}

/** Get the set of post IDs that a user has marked helpful. */
export async function getUserHelpfuls(userId: number, postIds: number[]): Promise<Set<number>> {
  if (postIds.length === 0) return new Set();
  const { data } = await supabase
    .from("post_helpfuls")
    .select("post_id")
    .eq("user_id", userId)
    .in("post_id", postIds);
  return new Set((data ?? []).map((r) => r.post_id));
}

/** Toggle like on/off for a post. Returns the new count and whether the user now has it active. */
export async function toggleLike(postId: number, userId: number) {
  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("post_likes").delete().eq("id", existing.id);
  } else {
    const { error } = await supabase
      .from("post_likes")
      .insert({ post_id: postId, user_id: userId });
    if (error) throw error;
  }

  const { count } = await supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  const newCount = count ?? 0;

  await supabase.from("posts").update({ likes_count: newCount }).eq("id", postId);

  return { active: !existing, count: newCount };
}

/** Get the set of post IDs that a user has liked. */
export async function getUserLikes(userId: number, postIds: number[]): Promise<Set<number>> {
  if (postIds.length === 0) return new Set();
  const { data } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("user_id", userId)
    .in("post_id", postIds);
  return new Set((data ?? []).map((r) => r.post_id));
}

/** Fetch posts created by a specific user, newest first. */
export async function fetchUserPosts(userId: number) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, avatar_emoji), comments(count)")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/** Get the top hashtags across all posts, sorted by how often they appear. */
export async function fetchHashtagCounts(): Promise<{ tag: string; count: number }[]> {
  const { data, error } = await supabase.rpc("get_hashtag_counts");
  if (error) throw error;
  return (data ?? []) as { tag: string; count: number }[];
}
