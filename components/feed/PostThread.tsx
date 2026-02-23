"use client";

import { useState } from "react";
import cn from "@/lib/classnames";
import { Avatar } from "../ui/Avatar";
import { TextArea } from "../ui/Input";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import SendIcon from "../icons/SendIcon";
import Hashtag from "../ui/Hashtag";
import CommentItem from "./CommentItem";

// we stop nesting replies after 3 levels deep — any deeper gets hard to read
const MAX_REPLY_DEPTH = 3;

export type Reply = {
  id: string;
  avatarEmoji?: string;
  name: string;
  timeAgo: string;
  content: string;
  likes?: number;
  replies?: Reply[];
};

export type Post = {
  id: string;
  avatarEmoji?: string;
  name: string;
  timeAgo: string;
  title: string;
  content: string;
  hashtags?: string[];
  likes?: number;
  helpful?: number;
  comments?: Reply[];
};

type PostThreadProps = {
  post: Post;
  helpfulActive?: boolean;
  likeActive?: boolean;
  onReply?: (parentId: string, content: string) => void;
  onLike?: (id: string) => void;
  onHelpful?: (id: string) => void;
  className?: string;
};

// renders one comment, its reply box, and any replies below it — each child uses this same component
function CommentWithReplies({
  reply,
  depth,
  onReply,
  onLike,
}: {
  reply: Reply;
  depth: number;
  onReply?: (parentId: string, content: string) => void;
  onLike?: (id: string) => void;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  // once we hit max depth, we hide the reply button so threads don't go on forever
  const canReply = depth < MAX_REPLY_DEPTH;

  const handleSubmitReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    onReply?.(reply.id, trimmed);
    setReplyText("");
    setReplyOpen(false);
  };

  return (
    <div>
      <CommentItem
        avatarEmoji={reply.avatarEmoji}
        name={reply.name}
        timeAgo={reply.timeAgo}
        content={reply.content}
        likes={reply.likes}
        onLike={() => onLike?.(reply.id)}
        onReply={canReply ? () => setReplyOpen((prev) => !prev) : undefined}
      />

      {replyOpen && (
        <div className="mt-2 ml-10 rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-3 space-y-2">
          <TextArea
            name="reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<SendIcon className="h-4 w-4" />}
              disabled={!replyText.trim()}
              onClick={handleSubmitReply}>
              Reply
            </Button>
          </div>
        </div>
      )}

      {reply.replies && reply.replies.length > 0 && (
        <div className="mt-2 ml-5 border-l-2 border-[var(--border-card-default)] pl-4 space-y-2">
          {reply.replies.map((child) => (
            <CommentWithReplies
              key={child.id}
              reply={child}
              depth={depth + 1}
              onReply={onReply}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostThread({
  post,
  helpfulActive,
  likeActive,
  onReply,
  onLike,
  onHelpful,
  className,
}: PostThreadProps) {
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    onReply?.(post.id, trimmed);
    setCommentText("");
  };

  const commentCount = countReplies(post.comments);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Original post */}
      <div className="rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-4">
        {/* Header: avatar + name + time */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar emoji={post.avatarEmoji} size="md" />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {post.name}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{post.timeAgo}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
          {post.title}
        </h3>

        {/* Body */}
        <p className="text-sm text-[var(--text-body)] mb-3">{post.content}</p>

        {/* Hashtags */}
        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.map((tag) => (
              <Hashtag key={tag} size="sm">
                {tag}
              </Hashtag>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div className="flex items-center gap-4">
          <IconButton
            icon={<HeartIcon />}
            aria-label="Like"
            count={post.likes}
            active={likeActive}
            onClick={() => onLike?.(post.id)}
          />
          <IconButton
            icon={<CommentIcon />}
            aria-label="Comments"
            count={commentCount}
            onClick={() =>
              document
                .getElementById("comments-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
          <IconButton
            icon={<LikeIcon />}
            aria-label="Helpful"
            count={post.helpful}
            label="Helpful"
            active={helpfulActive}
            onClick={() => onHelpful?.(post.id)}
          />
        </div>
      </div>

      {/* Comment count header */}
      <p id="comments-section" className="text-sm font-semibold text-[var(--text-primary)]">
        {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
      </p>

      {/* Always-visible comment input */}
      <div className="rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-4 space-y-3">
        <TextArea
          name="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your thoughts or advice..."
          rows={3}
        />
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<SendIcon className="h-4 w-4" />}
            disabled={!commentText.trim()}
            onClick={handleSubmitComment}>
            Post Comment
          </Button>
        </div>
      </div>

      {/* Comments / replies */}
      {post.comments && post.comments.length > 0 && (
        <div className="space-y-3">
          {post.comments.map((comment) => (
            <CommentWithReplies
              key={comment.id}
              reply={comment}
              depth={0}
              onReply={onReply}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// counts all comments including nested ones, so the comment count in the action bar is always accurate
function countReplies(replies?: Reply[]): number {
  if (!replies) return 0;
  return replies.reduce((sum, r) => sum + 1 + countReplies(r.replies), 0);
}
