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
