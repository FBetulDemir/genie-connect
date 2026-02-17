"use client";

import React, { useState } from "react";
import cn from "@/lib/classnames";
import { Avatar } from "../ui/Avatar";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import HeartIcon from "../icons/HeartIcon";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import Hashtag from "../ui/Hashtag";
import CommentItem from "./CommentItem";

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

function ReplyNode({
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

  const canReply = depth < MAX_REPLY_DEPTH;

  const handleSubmitReply = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    onReply?.(reply.id, trimmed);
    setReplyText("");
    setReplyOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitReply();
    }
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
        <div className="mt-2 ml-10 flex gap-2 items-start">
          <Input
            name="reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a reply..."
            containerClassName="flex-1"
          />
          <Button variant="primary" size="sm" onClick={handleSubmitReply}>
            Reply
          </Button>
        </div>
      )}

      {reply.replies && reply.replies.length > 0 && (
        <div className="mt-2 ml-5 border-l-2 border-[var(--border-card-default)] pl-4 space-y-2">
          {reply.replies.map((child) => (
            <ReplyNode
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
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    onReply?.(post.id, trimmed);
    setCommentText("");
    setCommentOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
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
            aria-label="Comment"
            count={commentCount}
            onClick={() => setCommentOpen((prev) => !prev)}
          />
          <IconButton
            icon={<LikeIcon />}
            aria-label="Helpful"
            count={post.helpful}
            label="helpful"
            active={helpfulActive}
            onClick={() => onHelpful?.(post.id)}
          />
        </div>
      </div>

      {/* Add comment input */}
      {commentOpen && (
        <div className="flex gap-2 items-start">
          <Input
            name="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment..."
            containerClassName="flex-1"
          />
          <Button variant="primary" size="sm" onClick={handleSubmitComment}>
            Comment
          </Button>
        </div>
      )}

      {/* Comments / replies */}
      {post.comments && post.comments.length > 0 && (
        <div className="space-y-3 ml-2 border-l-2 border-[var(--border-card-default)] pl-4">
          {post.comments.map((comment) => (
            <ReplyNode
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

function countReplies(replies?: Reply[]): number {
  if (!replies) return 0;
  return replies.reduce((sum, r) => sum + 1 + countReplies(r.replies), 0);
}
