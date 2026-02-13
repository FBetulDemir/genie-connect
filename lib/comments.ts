import { supabase } from "./supabase";

type CommentRow = {
  id: number;
  post_id: number;
  parent_id: number | null;
  author_id: number;
  content: string;
  depth: number;
  likes_count: number;
  created_at: string;
  profiles: {
    nickname: string;
    avatar_emoji: string;
  } | null;
};

export type CommentNode = CommentRow & {
  children: CommentNode[];
};

type CreateCommentInput = {
  postId: number;
  parentId: number | null;
  authorId: number;
  content: string;
  depth: number;
};

export async function fetchComments(postId: number) {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(nickname, avatar_emoji)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data as CommentRow[];
}

export async function createComment(input: CreateCommentInput) {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: input.postId,
      parent_id: input.parentId,
      author_id: input.authorId,
      content: input.content,
      depth: input.depth,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function buildCommentTree(flat: CommentRow[]): CommentNode[] {
  const map = new Map<number, CommentNode>();
  const roots: CommentNode[] = [];

  for (const row of flat) {
    map.set(row.id, { ...row, children: [] });
  }

  for (const node of map.values()) {
    if (node.parent_id && map.has(node.parent_id)) {
      map.get(node.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
