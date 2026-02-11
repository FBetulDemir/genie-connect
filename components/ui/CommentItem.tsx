import React from "react";
import cn from "@/lib/classnames";
import { Avatar } from "./Avatar";
import IconButton from "./IconButton";
import HeartIcon from "../icons/HeartIcon";
import ReplyIcon from "../icons/ReplyIcon";

type CommentItemProps = {
  avatarEmoji?: string;
  name: string;
  timeAgo: string;
  content: string;
  likes?: number;
  onLike?: () => void;
  onReply?: () => void;
  className?: string;
};

const CommentItem = ({
  avatarEmoji,
  name,
  timeAgo,
  content,
  likes = 0,
  onLike,
  onReply,
  className,
}: CommentItemProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border-card-default)] bg-[var(--surface-muted)] p-4",
        className,
      )}>
      {/* Header: avatar + name + time */}
      <div className="flex items-center gap-2 mb-2">
        <Avatar emoji={avatarEmoji} size="sm" />
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {name}
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          &middot; {timeAgo}
        </span>
      </div>

      {/* Content */}
      <p className="text-sm text-[var(--text-body)] mb-3">{content}</p>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <IconButton
          icon={<HeartIcon />}
          aria-label="Like"
          count={likes}
          onClick={onLike}
        />
        <IconButton
          icon={<ReplyIcon />}
          aria-label="Reply"
          label="Reply"
          onClick={onReply}
        />
      </div>
    </div>
  );
};

export default CommentItem;
